import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import Markdown from 'react-markdown'
import Prism from 'prismjs'

const Message = ({ message }) => {

    useEffect(() => {
        Prism.highlightAll()
    }, [message.content])

    return (
        <div>
            {message.role === "user" ? (
                <div className='flex items-start justify-end my-4 gap-2'>
                    {/* User Container*/}
                    <div className='flex flex-col gap-2 p-2 px-4 bg-[#F9F6F0] dark:bg-[#1A1A1A] 
                    border border-[#D4AF37]/20 dark:border-[#D4AF37]/5 rounded-md max-w-2xl'>
                        <p className='text-sm text-black dark:text-white'>{message.content}</p>
                    </div>
                    <img src={assets.user_icon} alt="" className='w-8 rounded-full' />
                </div>
            ) : (
                <div className='flex items-start my-4 gap-2'>
                    {/* AI Container */}
                    <div className={`inline-flex flex-col gap-2 max-w-2xl rounded-md
                         ${message.isImage ? 'border-none bg-transparent' :
                            'p-2 px-4 bg-[#F0F0F0]/70 dark:bg-[#121212] border border-gray-200 dark:border-[#D4AF37]/5'}`}>
                        {message.isImage ? (
                            <img src={message.content} alt="" className='w-full max-w-md rounded-md' />
                        ) : (
                            <div className='text-sm text-black dark:text-white reset-tw'><Markdown>{message.content}</Markdown></div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Message