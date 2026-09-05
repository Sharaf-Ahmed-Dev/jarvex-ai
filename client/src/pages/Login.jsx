import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Login = () => {
    const [state, setState] = useState("login")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { axios, setToken } = useAppContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = state === "login" ? '/api/user/login' : '/api/user/register'

        try {
            const { data } = await axios.post(url, { name, email, password })
            if (data.success) {
                setToken(data.token)
                localStorage.setItem('token', data.token)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="w-[92%] sm:w-[380px] text-center bg-white 
                dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 
                rounded-2xl px-6 sm:px-8 py-6 shadow-xl mx-auto my-auto sm:mt-20 relative z-10">

                {/* JarveX Logo Header Area */}
                <div className="flex flex-col items-center justify-center mt-4 mb-2 gap-1">
                    <div className="text-xl font-bold bg-gradient-to-r from-[#DFBA73] via-[#C5A880] to-[#9E7F44] 
                    bg-clip-text text-transparent tracking-wide">
                        JarveX AI
                    </div>
                    <p className="text-xs text-gray-500 dark:text-zinc-500 font-medium tracking-tight">Intelligent AI Assistant</p>
                </div>

                <h1 className="text-slate-800 dark:text-white text-2xl font-semibold mt-4">
                    {state === "login" ? "Welcome Back" : "Create Account"}
                </h1>

                <p className="text-gray-400 dark:text-zinc-400 text-sm mt-2">
                    {state === "login" ? "Please sign in to continue" : "Please sign up to get started"}
                </p>

                {state !== "login" && (
                    <div className="flex items-center mt-6 w-full bg-gray-50 dark:bg-zinc-800/40 border 
                    border-gray-200 dark:border-zinc-800 focus-within:border-[#C5A880] focus-within:ring-1 
                    focus-within:ring-[#C5A880] h-12 rounded-full overflow-hidden pl-5 gap-3 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" className="text-gray-400 dark:text-zinc-500" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="5" />
                            <path d="M20 21a8 8 0 0 0-16 0" />
                        </svg>
                        {/* Name Input Box */}
                        <input type="text" placeholder="Name" className="w-full bg-transparent text-slate-800 dark:text-white 
                        placeholder-gray-400 dark:placeholder-zinc-500 border-none outline-none text-sm" value={name}
                            onChange={(e) => setName(e.target.value)} required />
                    </div>
                )}

                <div className="flex items-center w-full mt-4 bg-gray-50 dark:bg-zinc-800/40 border border-gray-200 
                dark:border-zinc-800 focus-within:border-[#C5A880] focus-within:ring-1 focus-within:ring-[#C5A880] h-12 
                rounded-full overflow-hidden pl-5 gap-3 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" className="text-gray-400 dark:text-zinc-500" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                    </svg>
                    {/* Email Input Box */}
                    <input type="email" placeholder="Email id" className="w-full bg-transparent text-slate-800 dark:text-white 
                    placeholder-gray-400 dark:placeholder-zinc-500 border-none outline-none text-sm" value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="flex items-center mt-4 w-full bg-gray-50 dark:bg-zinc-800/40 border border-gray-200 
                dark:border-zinc-800 focus-within:border-[#C5A880] focus-within:ring-1 focus-within:ring-[#C5A880] h-12 
                rounded-full overflow-hidden pl-5 gap-3 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" className="text-gray-400 dark:text-zinc-500" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    {/* Password Input Box */}
                    <input type="password" placeholder="Password" className="w-full bg-transparent text-slate-800 
                    dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 border-none outline-none text-sm"
                        value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {/* Button */}
                <button type="submit" className="mt-8 w-full h-11 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A880] to-[#9E7F44] 
                text-neutral-900 font-medium hover:opacity-90 transition-opacity duration-200 cursor-pointer shadow-md">
                    {state === "login" ? "Sign In" : "Get Started"}
                </button>

                <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-500 
                dark:text-zinc-400 text-sm mt-5 mb-4 cursor-pointer">
                    {state === "login" ? "Don't have an account? " : "Already have an account? "}
                    <span className="text-[#C5A880] font-medium hover:underline ml-1">Register here</span>
                </p>
            </form>
        </>
    )
}

export default Login