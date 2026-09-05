import React, { useEffect, useState } from 'react'
import { dummyPlans } from '../assets/assets'
import Loading from './Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Credits = () => {

    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const { axios, token } = useAppContext()

    const fetchPlans = async () => {
        try {
            const { data } = await axios.get('/api/credit/plan',
                { headers: { Authorization: token } })

            if (data.success) {
                setPlans(data.plans)
            } else {
                toast.error(data.message || 'Failed to fetch plans.')
            }
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    const purchasePlan = async (planId) => {
        try {
            const { data } = await axios.post('/api/credit/purchase', { planId },
                { headers: { Authorization: token } })
            if (data.success) {
                window.location.href = data.url
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchPlans()
    }, [])

    if (loading) return <Loading />

    return (
        <div className='max-w-7xl min-h-screen overflow-y-auto mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-center mb-10 xl:mt-30
            text-slate-800 dark:text-white'>Credit Plans</h2>

            <div className='flex flex-wrap justify-center gap-8'>
                {plans.map((plan) => (
                    <div key={plan._id} className={`border border-amber-200 
                     dark:border-zinc-800 rounded-lg shadow hover:shadow-lg
                     transition-shadow p-6 min-w-[300px] flex flex-col ${plan._id === "pro" ?
                            "bg-amber-100/50 dark:bg-[#9E7F44]/10 border-[#C5A880]" :
                            "bg-white dark:bg-transparent"}`}>
                        <div className='flex-1'>
                            <h3 className='text-xl font-semibold text-gray-900 
                        dark:text-white mb-2'>{plan.name}</h3>
                            <p className='text-2xl font-bold bg-gradient-to-r from-[#DFBA73] 
                        via-[#C5A880] to-[#9E7F44] bg-clip-text text-transparent mb-4'>${plan.price}
                                <span className='text-base font-normal text-gray-600
                            dark:text-gray-400'>{' '}/ {plan.credits} credits</span>
                            </p>
                            <ul className='list-disc list-inside text-sm text-gray-700
                        dark:text-gray-400 space-y-1'>
                                {plan.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={() => toast.promise(purchasePlan(plan._id),
                        {loading:'Processing...'})} className='mt-6 bg-gradient-to-r from-[#DFBA73] via-[#C5A880] 
                    to-[#9E7F44] text-neutral-900 font-medium hover:opacity-90 
                    font-medium py-2 rounded transition-colors cursor-pointer'>Buy Now</button>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Credits