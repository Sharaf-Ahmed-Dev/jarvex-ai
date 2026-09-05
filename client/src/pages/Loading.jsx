import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Loading = () => {

    const navigate = useNavigate()
    const { fetchUser } = useAppContext()

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchUser()
            navigate('/')
        }, 3000)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <div className='bg-gradient-to-b from-[#1A1A1A] to-[#121212] flex items-center 
        justify-center h-screen w-screen text-white text-2xl'>
            <div className='w-10 h-10 rounded-full border-4 border-[#D4AF37]/30 
            border-t-[#D4AF37] animate-spin'></div>
        </div>
    )
}

export default Loading