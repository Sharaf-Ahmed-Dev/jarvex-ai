import axios from "axios"
import Chat from "../models/Chat.js"
import User from "../models/User.js"
import imagekit from "../configs/imageKit.js"
import openai from "../configs/openai.js"


// Text based ai chat message controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id

        // check credits
        if (req.user.credits < 1) {
            return res.json({ success: false, message: "You don't have enough credits to use this feature" })
        }

        const { chatId, prompt } = req.body

        const chat = await Chat.findOne({ userId, _id: chatId })
        chat.messages.push({
            role: "user", content: prompt,
            timestamp: Date.now(), isImage: false
        })

        const { choices } = await openai.chat.completions.create({
            model: "gemini-3.5-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const reply = {
            role: "assistant",
            content: choices[0].message.content,
            timestamp: Date.now(),
            isImage: false
        }
        res.json({ success: true, reply })

        chat.messages.push(reply)
        await chat.save()
        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } })

    } catch (error) {
        console.error(error);

        if (error.status === 429) {
            return res.status(429).json({
                success: false, message:
                    "Gemini API quota exceeded. Please try again later."
            });
        }

        if (error.status === 503) {
            return res.status(503).json({
                success: false, message:
                    "Gemini is temporarily unavailable. Please try again later."
            });
        }

        return res.status(500).json({ success: false, message: error.message });
    }
}

// Image generation message controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        // check credits
        if (req.user.credits < 2) {
            return res.json({ success: false, message: "You don't have enough credits to use this feature" })
        }

        const { prompt, chatId, isPublished } = req.body;
        // Find chat
        const chat = await Chat.findOne({ userId, _id: chatId })

        // push user message
        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        })

        // Enocde the prompt
        const encodedPrompt = encodeURIComponent(prompt)

        // Construct ImageKit AI generation URL
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/jarvex/${Date.now()}.png`;


        // Trigger generation by fetching from ImageKit
        let aiImageResponse;

        for (let i = 0; i < 60; i++) {
            aiImageResponse = await axios.get(
                generatedImageUrl,
                { responseType: "arraybuffer" }
            );

            const isIntermediate =
                aiImageResponse.headers["is-intermediate-response"];

            console.log(
                `Attempt ${i + 1} - intermediate:`,
                isIntermediate
            );

            if (isIntermediate !== "true") {
                break;
            }

            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        if (
            aiImageResponse.headers["content-type"]?.startsWith("image/") === false
        ) {
            return res.json({
                success: false,
                message: "ImageKit could not generate the image yet. Please try again."
            });
        }

        // Convert to Base64
        const base64Image = `data:image/png;base64,${Buffer.from(
            aiImageResponse.data,
            "binary"
        ).toString("base64")}`;


        // Upload to Imagekit media library
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: "jarvexai"
        })

        const reply = {
            role: 'assistant',
            content: uploadResponse.url,
            timestamp: Date.now(),
            isImage: true,
            isPublished
        }
        res.json({ success: true, reply })

        chat.messages.push(reply)
        await chat.save()
        await User.updateOne({ _id: userId }, { $inc: { credits: -2 } })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}