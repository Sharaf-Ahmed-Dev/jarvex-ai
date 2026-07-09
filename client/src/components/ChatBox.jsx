import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { useSearchParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Message from './Message'

const ChatBox = () => {

    const containerRef = useRef(null)

    const { selectedChat, theme } = useAppContext()

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)

    const [prompt, setPrompt] = useState('')
    const [mode, setMode] = useState('text')
    const [ispublished, setIsPublished] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        if (selectedChat) (
            setMessages(selectedChat.messages)
        )
    }, [selectedChat])

    useEffect(()=>{
        if(containerRef.current){
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
            })
        }
    }, [messages])

    return (
        <div className='flex-1 flex flex-col justify-between m-5 md:m-10
        xl:mx-30 max-md:mt-14 2xl:pr-40'>

            {/* Chat Messages*/}
            <div ref={containerRef} className='flex-1 mb-5 overflow-y-scroll [&::-webkit-scrollbar]:hidden 
            [scrollbar-width:none] [-ms-overflow-style:none]'>
                {messages.length === 0 && (
                    <div className='h-full flex flex-col items-center justify-center
                    gap-2  text-primary'>
                        <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
                            className='w-full mr-4 max-w-56 sm:max-w-68' alt="" />
                        <p className='mt-1 sm:mt-3 text-[40px] sm:text-6xl text-center bg-gradient-to-b
                        from-[#A68042] to-[#4A4947] bg-clip-text text-transparent
                        dark:text-white'>Ready for you.</p>
                    </div>
                )}
                {messages.map((message, index) => <Message key={index} message={message} />)}

                {/* Three Dots Loading */}
                {
                    loading && <div className='loader flex items-center gap-1.5'>
                        <div className='w-1.5 h-1.5 rounded-full bg-gray-500
                        dark:bg-white animate-bounce'></div>
                        <div className='w-1.5 h-1.5 rounded-full bg-gray-500
                        dark:bg-white animate-bounce'></div>
                        <div className='w-1.5 h-1.5 rounded-full bg-gray-500
                        dark:bg-white animate-bounce'></div>
                    </div>
                }
            </div>
            {mode === 'image' && (
                <label className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
                    <p className='text-xs'>Publish This Generated Image to Community</p>
                    <input type="checkbox" className='cursor-pointer w-4 h-4 accent-[#D4AF37]' checked={ispublished}
                    onChange={(e)=>setIsPublished(e.target.checked)}/>
                </label>
            )}

            {/* Prompt Input Box */}
            <form onSubmit={onSubmit} className='bg-[#F9F6F0] dark:bg-[#1A1A1A] border border-[#D4AF37]/50 dark:border-0 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'>
                <select onChange={(e) => setMode(e.target.value)} value={mode} className='text-sm pl-3 pr-2 outline-none bg-transparent text-black dark:text-white'>
                    <option className='bg-[#F9F6F0] dark:bg-[#1A1A1A] text-black dark:text-white' value="text">Text</option>
                    <option className='bg-[#F9F6F0] dark:bg-[#1A1A1A] text-black dark:text-white' value="image">Image</option>
                </select>
                <input onChange={(e) => setPrompt(e.target.value)} value={prompt} type="text" placeholder='Ask JarveX anything...' className='flex-1 w-full text-sm outline-none bg-transparent text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500' required />
                <button disabled={loading}>
                    <img src={loading ? assets.stop_icon : assets.send_icon} className='w-8 cursor-pointer' alt="" />
                </button>
            </form>

        </div>
    )
}

export default ChatBox