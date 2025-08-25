"use client"
import { UserContext } from '@/context/UserContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
// import "../globals.css"

const CommunityLayout = ({
    children
}: {
    children: React.ReactNode
}
) => {
    return (
        <div
            className="flex flex-col min-h-screen text-white font-sans w-full ">
            {/* Top Navbar */}
            <Navbar />

            <div>
                {children}
            </div>
        </div>
    )
}

export default CommunityLayout

function Navbar() {
    const [scrollY, setScrollY] = useState(0)
    const { isAuthenticated, setIsAuthenticated } = useContext(UserContext)
    const navigate = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const handleLogout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem("token")
        navigate.push("/")
    }


    return (
        <div className={`flex items-center sticky top-0 justify-between px-6 py-4 shadow-sm shadow-gray-300 ${scrollY > 20 ? "bg-transparent  backdrop-blur-lg" : "bg-[#F3E9DC]"}`}>
            <div className='flex flex-row gap-8 items-center'>
                <Link href="/">
                    <div className='font-bold text-orange-900 text-2xl knewave-regular cursor-pointer '>
                        VRiTTi
                    </div>
                </Link>

                <div>
                    <ul className='flex flex-row gap-4 text-black p-4 font-semibold'>
                        <Link href="/dashboard">
                            <li
                                className='hover:cursor-pointer p-2 hover:bg-gray-400/30 rounded-xl transition-colors duration-500 ease-out'

                            >Dashboard</li>
                        </Link>
                        <Link href="">
                            <li
                                className='hover:cursor-pointer p-2 hover:bg-gray-400/30 rounded-xl transition-colors duration-500 ease-out'

                            >Popular</li>
                        </Link>
                        <Link href="">
                            <li
                                className='hover:cursor-pointer p-2 hover:bg-gray-400/30 rounded-xl transition-colors duration-500 ease-out'

                            >Explore</li>
                        </Link>
                        <Link href="">
                            <li
                                className='hover:cursor-pointer p-2 hover:bg-gray-400/30 rounded-xl transition-colors duration-500 ease-out'

                            >All</li>
                        </Link>
                    </ul>
                </div>
            </div>
            <div>
                {isAuthenticated &&
                    <div
                        onClick={handleLogout}
                        className='bg-orange-400 rounded-xl p-2 hover:cursor-pointer font-bold hover:bg-transparent hover:shadow-lg hover:shadow-orange-400 hover:text-black'>Logout</div>
                }
            </div>
        </div>
    )
}
