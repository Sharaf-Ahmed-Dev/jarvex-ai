import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Community = () => {

    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const { axios } = useAppContext()

    const fetchImages = async () => {
        try {
            const { data } = await axios.get('/api/user/published-images')
            if (data.success) {
                setImages(data.images)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchImages()
    }, [])

    if (loading) return <Loading />

    return (
        <div className='p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full
        overflow-y-scroll [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]'>
            <h2 className='text-center sm:text-left text-2xl sm:text-3xl font-semibold 
            mb-4 sm:mb-6 text-slate-800 dark:text-white tracking-tight'>Community Images</h2>
            {images.length > 0 ? (
                <div className='flex flex-wrap max-sm:justify-center gap-10'>
                    {images.map((item, index) => (
                        <a key={index} href={item.imageUrl} target='_blank' className='relative group w-44 sm:w-56 h-44 sm:w-56 block rounded-lg 
                        overflow-hidden border border-slate-200 dark:border-amber-100
                        shadow-sm hover:shadow-md transition-shadow duration-300'>
                            <img src={item.imageUrl} alt="" className='w-full
                            h-40 md:h-50 2xl:h-62 object-cover group-hover:scale-105
                            transition-transform duration-300 ease-in-out' />
                            <p className='absolute bottom-0 right-0 text-xs bg-black/50
                            backdrop-blur text-white px-4 py-1 rounded-tl-xl opacity-0
                            group-hover:opacity-100 transition duration-300'>Created by {item.userName}</p>
                        </a>
                    ))}
                </div>
            ) : (
                <p className='text-center text-slate-500 dark:text-gray-400
                mt-10'>No Images Available</p>
            )}
        </div>
    )
}

export default Community