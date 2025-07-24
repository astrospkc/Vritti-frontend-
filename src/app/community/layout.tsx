import React from 'react'

const CommunityLayout = ({
    children
}: {
    children: React.ReactNode
}
) => {
    return (
        <div

            // style={{
            //     background: 'radial-gradient(circle at center, #1a0c2b, #1E293B, #0F172A)',
            // }}
            className="flex flex-col min-h-screen text-white font-sans w-full bg-[#F6F6F6]">
            {/* Top Navbar */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#F3E9DC] shadow-lg shadow-gray-300">
                <input
                    type="text"
                    placeholder="trump got mad"
                    className="bg-[#3B3B4F] text-sm text-white placeholder-gray-400 px-4 py-2 rounded-md w-1/3 focus:outline-none"
                />
                <button className="bg-blue-600 hover:bg-blue-700  px-4 py-2 rounded-md text-sm">
                    Shout Any Plan?
                </button>

                <div>
                    <button className="bg-gray-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm ">
                        Logout
                    </button>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default CommunityLayout
