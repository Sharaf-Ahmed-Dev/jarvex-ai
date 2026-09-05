import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Loading = ({ redirect = false }) => {
    const navigate = useNavigate()
    const { fetchUser } = useAppContext()

    useEffect(() => {
        if (!redirect) return // Skip redirect if used inside Community/Credits

        const timeout = setTimeout(() => {
            fetchUser()
            navigate('/')
        }, 3000)
        return () => clearTimeout(timeout)
    }, [redirect])

    return (
        <div className='flex items-center justify-center h-full w-full min-h-[50vh] text-white'>
            <div className='w-10 h-10 rounded-full border-4 
            border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin'></div>
        </div>
    )
}

export default Loading