import React from 'react'
import { Link } from 'react-router-dom'

const CommunityPage = () => {
    return (


        <div

            style={{
                background: 'radial-gradient(circle at center, #1a0c2b, #1E293B, #0F172A)',
            }}
            className="min-h-screen text-white font-sans w-full">
            {/* Top Navbar */}
            <div className="flex items-center justify-between px-6 py-4 bg-black shadow-lg shadow-gray-900">
                <input
                    type="text"
                    placeholder="trump got mad"
                    className="bg-[#3B3B4F] text-sm text-white placeholder-gray-400 px-4 py-2 rounded-md w-1/3 focus:outline-none"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                    Shout Any Plan?
                </button>
                <div className="w-10 h-10 rounded-full bg-gray-500"></div>
            </div>

            {/* Page Content */}
            <div className="flex gap-4 p-6">
                {/* Left Sidebar */}
                <div className="w-1/5 space-y-6">
                    <div className="bg-black shadow-md shadow-violet-500 p-4 rounded-xl">
                        <h2 className="font-semibold text-lg">Joshua Premise</h2>
                        <p className="text-sm text-gray-400">@joshuaLink_87</p>
                        {/* <div className="mt-4 text-sm space-y-1">
                            <p>Buckets: <span className="text-white font-semibold">25</span></p>
                            <p>Followers: <span className="text-white font-semibold">65</span></p>
                            <p>Following: <span className="text-white font-semibold">129</span></p>
                        </div> */}
                    </div>
                    <div className="bg-black shadow-md shadow-violet-950/80 p-4 rounded-xl">
                        <h1 className='border-b-2 p-2 w-fit'>Navigate to :</h1>
                        <ul className='text-sm font-semibold p-2 gap-2 flex flex-col'>
                            <Link to="/">
                                <li className=' hover:text-violet-500 hover:cursor-pointer'>Dashboard</li>

                            </Link>
                            <li className=' hover:text-violet-500 hover:cursor-pointer'>Popular</li>
                            <li className=' hover:text-violet-500 hover:cursor-pointer'>Replies</li>
                            <li className=' hover:text-violet-500 hover:cursor-pointer'>Explore</li>
                            <li className=' hover:text-violet-500 hover:cursor-pointer'>All</li>
                        </ul>

                    </div>

                    <div className="bg-black shadow-md shadow-violet-950/80 p-4 rounded-xl">
                        <h3 className="font-semibold mb-2">Recent Stories</h3>
                        <ul className="text-sm space-y-1 text-gray-300">
                            <li>Robert Downey Jr</li>
                            <li>Scarlett Johansson</li>
                            <li>Chris Hemsworth</li>
                            <li>Gal Gadot</li>
                        </ul>
                    </div>

                    <div className="bg-black shadow-md shadow-violet-950/80 p-4 rounded-xl">
                        <h3 className="font-semibold">Recently Saved</h3>
                        <p className="text-sm text-gray-400 mt-2">Design Virtual Summit</p>
                    </div>

                    <div className="bg-black shadow-2xl shadow-black p-4 rounded-xl">

                        + Create Post
                    </div>
                    <div className="bg-black shadow-2xl shadow-black p-4 rounded-xl">

                        Communities
                    </div>
                </div>

                {/* Main Feed */}
                <div className="w-3/5 space-y-6">
                    <div className="bg-black shadow-2xl shadow-black p-4 rounded-xl">
                        <p className="text-sm text-gray-300">
                            I am a representative of the New Australian company <span className="text-white">troffer.com</span>... <br />
                            <span className="text-blue-400">Share This Post</span>
                        </p>
                        <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">
                            Share This Post
                        </button>
                    </div>

                    {["Querindolina Rodriguez Perezenco", "Britney Spears", "Mark Ruffalo"].map((name, idx) => (
                        <div key={idx} className="bg-black shadow-2xl shadow-blackbg-[#2A2A3C] p-4 rounded-xl">
                            <h3 className="font-semibold text-md mb-1">{name}</h3>
                            <p className="text-sm text-gray-300 mb-2">
                                Kiersten's site focuses on the intersection of fashion and travel. She gives tips and advice...
                            </p>
                            <div className="flex space-x-2 mb-2">
                                <div className="bg-gray-500 w-20 h-20 rounded-lg"></div>
                                <div className="bg-gray-500 w-20 h-20 rounded-lg"></div>
                                <div className="bg-gray-500 w-20 h-20 rounded-lg"></div>
                            </div>
                            <div className="flex space-x-4 text-sm text-gray-400">
                                <span>❤ 18</span>
                                <span>💬 25</span>
                                <span>🔁 8</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Sidebar */}
                <div className="w-1/5 space-y-6">


                    <div className="bg-[#2A2A3C] p-4 shadow-md shadow-orange-700  rounded-xl">
                        <h3 className="font-semibold mb-2">Trending</h3>
                        <div className="flex flex-wrap gap-2">
                            {["britney", "texts", "buzzing", "perfect", "elon", "hawanna"].map((tag, i) => (
                                <span key={i} className="bg-[#3B3B4F] px-3 py-1 rounded-full text-xs">#{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#2A2A3C] shadow-md shadow-orange-700 p-4 rounded-xl">
                        <h3 className="font-semibold mb-2">Friends to Follow</h3>
                        <ul className="text-sm text-gray-300 space-y-1">
                            <li>Lucas Huda</li>
                            <li>Derlyn Sersi</li>
                            <li>Jacob Huda</li>
                            <li>Lucas Mello</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default CommunityPage
