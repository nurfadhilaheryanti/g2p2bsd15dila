import apps from '../assets/icons/apps.svg'
import settings from '../assets/icons/settings.svg'
import help from '../assets/icons/help.svg'
import feedback from '../assets/icons/feedback.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
    const navigate = useNavigate()
    function handleLogout(){
        localStorage.clear()
        navigate('/login')
    }
    return (
        <>
            <header className="flex justify-between items-center p-4 border-b border-gray-300">
                <div className="flex items-center">
                    <img src="https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-96dp/logo_meet_2020q4_color_2x_web_96dp.png" alt="Google Meet" className="h-8"/>
                    <p className='ml-2 font-normal text-2xl text-gray-700'>Hacktiv</p>
                    <p className='ml-2 underline text-xl text-gray-700'>Meet</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={handleLogout} className="text-sm">Logout</button>
                    <span className="text-sm">7:40 PM • Tue, Jun 18</span>
                    <button className="text-gray-600">
                        <img src={help} alt=""/>
                    </button>
                    <button className="text-gray-600">
                        <img src={feedback} alt=""/>
                    </button>
                    <button className="text-gray-600">
                        <img src={settings} alt=""/>
                    </button>
                    <button className="text-gray-600">
                        <img src={apps} alt=""/>
                    </button>
                    <button className="text-gray-600">
                        {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M3 7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7z"></path>
                        </svg> */}
                        <img className="rounded-full w-10 h-10 object-cover" src={localStorage.profilePict} alt="" />
                    </button>
                </div>
            </header>
        </>
    )
}