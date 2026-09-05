import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import { assets } from './assets/assets'
import './assets/prism.css'
import Loading from './pages/Loading'
import { useAppContext } from './context/AppContext'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'

const App = () => {

  const { user, loadingUser } = useAppContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()

  if (pathname === '/loading' || loadingUser) return <Loading />

  return (
    <>
      <Toaster />
      {user ? (
        <div className='bg-gradient-to-b dark:from-[#0B0B0B] dark:via-[#1A140A] dark:to-[#050505] dark:text-white'>
          <div className='flex h-screen w-screen relative'>
            {!isMenuOpen && (
              <img
                src={assets.menu_icon}
                className='absolute top-3 left-3 w-5.5 h-5.5 cursor-pointer md:hidden z-50'
                onClick={() => setIsMenuOpen(true)}
              />
            )}

            <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <Routes>
              <Route path='/' element={<ChatBox />} />
              <Route path='/credits' element={<Credits />} />
              <Route path='/community' element={<Community />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-b from-stone-50 via-neutral-100 to-zinc-200 
        dark:from-[#1D1B1E] dark:via-[#131114] dark:to-[#070708]
         flex items-center justify-center h-screen w-screen transition-all duration-500">
          <Login />
        </div>
      )}
    </>
  )
}

export default App