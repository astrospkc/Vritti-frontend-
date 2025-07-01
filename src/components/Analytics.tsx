import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Button from '../UIComponent/Button'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { journalContext } from '../context/JournalContext';
import JournalCard from './cards/JournalCard';

const Analytics = () => {
    const [date, setDate] = useState(new Date());
    const { journals, monthYear, journalObject } = useContext(journalContext)
    // console.log("journals, monthYear, journalObject: ", journals, monthYear, journalObject)
    const [selectedMonth, setSelectedMonth] = useState("")
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    // console.log(journals, monthYear, journalObject)
    let month
    if (monthYear.length > 0) {
        month = monthYear[0].split(" "[0])
        console.log("month: ", month[0])
    }

    useEffect(() => {
        setSelectedMonth(month[0])
    }, [])



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

                <div className='flex flex-row gap-4 w-full'>
                    <div className='w-full'>
                        <h1 className=' p-2 rounded-lg shadow-sm shadow-emerald-500 w-fit text-2xl text-emerald-500 my-4'>Recent journals</h1>

                        <div className='grid grid-cols-4 gap-4'>
                            {
                                journals && journals.map((item, i) => {
                                    if (i >= 4) return null
                                    const date = new Date(item.date)
                                    console.log(date.toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    }))
                                    const formattedDate = date.toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    });
                                    return (
                                        <div className='' >
                                            <JournalCard
                                                key={i}
                                                id={item._id}
                                                title={item.title}
                                                subtitle={item.subtitle}
                                                body={item.body}
                                                date={formattedDate}

                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="text-xl font-bold text-gray-100">
                        <Calendar
                            onChange={setDate}
                            value={date}
                            className="bg-black text-sm rounded-xl p-3" />
                    </div>


                </div>

                {/* Content Area */}
                <div className="flex flex-col lg:flex-row gap-6 w-full h-full border-t-2 border-gray-500 py-4 my-2">
                    {/* Left: Weekly Overview */}
                    <div className="flex-1  rounded-xl p-4 shadow-md">
                        <div className="mb-4 flex flex-row gap-4 justify-start items-center">

                            <div>
                                <label className='text-white mx-2' >Month</label>
                                <select
                                    name=""
                                    id=""
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className='rounded-xl bg-gray-300'
                                >
                                    <option value="" disabled >Search with month</option>
                                    {months.map((month, index) => (
                                        <option value={index + 1} key={index}>
                                            {month}
                                        </option>
                                    ))}

                                </select>
                            </div>
                        </div>
                        <div className='text-8xl text-yellow-100 my-2'>
                            {selectedMonth}
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
                        {/* ------ */}
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
