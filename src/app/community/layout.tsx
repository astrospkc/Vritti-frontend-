"use client"
import Link from 'next/link'
import React from 'react'
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
            <div className="flex items-center justify-between px-6 py-4 bg-[#F3E9DC] shadow-lg shadow-gray-300">
                <div className='flex flex-row gap-8 items-center'>
                    <Link href="/">
                        <div className='font-bold text-orange-900 text-2xl knewave-regular cursor-pointer '>
                            VRiTTi
                        </div>
                    </Link>

                    <div>
                        <ul className='flex flex-row gap-4 text-black p-4'>
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
                    <div className='bg-orange-400 rounded-xl p-2 hover:cursor-pointer font-bold hover:bg-transparent hover:shadow-lg hover:shadow-orange-400 hover:text-black'>Login</div>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default CommunityLayout
