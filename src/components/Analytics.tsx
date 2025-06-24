import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Button from '../UIComponent/Button'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const Analytics = () => {
    const [date, setDate] = useState(new Date());
    return (
        <div className="flex h-screen w-full">
            {/* Sidebar */}
            <Sidebar currentPage="community" />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar px-6 py-4">
                {/* Header */}
                <div className="text-4xl md:text-6xl text-violet-400 border-b-2 pb-3 mb-4">
                    Analytics
                </div>

                {/* Content Area */}
                <div className="flex flex-col lg:flex-row gap-6 w-full h-full">
                    {/* Left: Weekly Overview */}
                    <div className="flex-1  rounded-xl p-4 shadow-md">
                        <div className="mb-4">
                            <Button>Recent</Button>
                        </div>

                        <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
                            {/* Background image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-20 hover:opacity-40 transition duration-300"
                                style={{
                                    backgroundImage: `url("/images/glasseffect.jpg")`,
                                }}
                            />

                            {/* Foreground content */}
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full h-full p-6 gap-6">
                                <div className="text-5xl md:text-8xl text-emerald-600 rotate-0 md:rotate-90">
                                    MONTH
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"].map((week, index) => (
                                        <div
                                            key={index}
                                            className="bg-black text-white flex items-center justify-center rounded-xl h-[100px] md:h-[140px] w-[90px] text-xl font-semibold shadow-md shadow-emerald-700 hover:scale-105 transition duration-300"
                                        >
                                            {week}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Calendar Panel */}
                    <div className="w-full lg:w-[30%]  rounded-xl p-4 shadow-md flex flex-col gap-4">
                        <div className="text-xl font-bold text-gray-100">
                            <Calendar
                                onChange={setDate}
                                value={date}
                                className="text-sm border-2 rounded-xl p-3" /></div>
                        <div className="flex-1 bg-slate-800 rounded-lg shadow-inner p-4">
                            {/* Placeholder for Calendar */}
                            <p className="text-gray-500 text-sm text-center">Calendar component here</p>
                        </div>
                        <div className="flex-1 bg-slate-600 rounded-lg shadow-inner p-4">
                            {/* Placeholder for Notes/Insights */}
                            <p className="text-gray-500 text-sm text-center">Insights or actions</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics
