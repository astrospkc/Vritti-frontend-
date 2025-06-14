import React from 'react'
import Sidebar from './Sidebar'

import { useState } from 'react'
import JournalCard from './cards/JournalCard'


const MonthlyPage = () => {

    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedYear, setSelectedYear] = useState("")
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = Array.from({ length: 51 }, (_, i) => 2024 + i)
    return (
        <div className='flex flex-row w-full h-screen  '>

            <Sidebar currentPage="community" />
            <div className='w-[80%] overflow-y-auto no-scrollbar m-4 my-10'>
                {/* <h1 className='text-emerald-700 text-6xl mb-10'>Monthy Journal</h1> */}
                <div className='flex flex-row gap-4 justify-center items-center rounded-2xl p-2 bg-violet-200/10 shadow-lg shadow-black'>
                    <div>
                        <label className='text-white mx-2' > Search</label>

                        <input type="text" className='rounded-2xl bg-gray-700 text-white p-2' placeholder='search with title' />
                    </div>
                    {/* month selector */}
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
                    <div>
                        <label className='text-white mx-2' >Year</label>
                        <select
                            name=""
                            id=""
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className='rounded-xl bg-gray-300'
                        >
                            <option value="" disabled >Search with year</option>
                            {years.map((year, index) => (
                                <option value={index + 1} key={index}>
                                    {year}
                                </option>
                            ))}

                        </select>
                    </div>
                </div>
                <div>
                    <h1 className='text-3xl text-yellow-100  mb-10 border-b-2 border-gray-600 p-2'>
                        Week 1
                    </h1>
                    <div className="grid grid-cols-5 gap-4">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <JournalCard
                                key={index}
                                title="Sunset Reflections"
                                subtitle="Nature Photography"
                                date="June 14, 2025"
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className='text-3xl text-yellow-100 mb-10 border-b-2 border-gray-600 p-2'>Week 2</h1>
                    <div className="grid grid-cols-5 gap-4">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <JournalCard
                                key={index}
                                title="Sunset Reflections"
                                subtitle="Nature Photography"
                                date="June 14, 2025"

                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className='text-3xl text-yellow-100 mb-10 border-b-2 border-gray-600 p-2'>Week 3</h1>
                    <div className="grid grid-cols-5 gap-4">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <JournalCard
                                key={index}
                                title="Sunset Reflections"
                                subtitle="Nature Photography"
                                date="June 14, 2025"
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className='text-3xl text-yellow-100 mb-10 border-b-2 border-gray-600 p-2'>Week 4</h1>
                    <div className="grid grid-cols-5 gap-4">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <JournalCard
                                key={index}
                                title="Sunset Reflections"
                                subtitle="Nature Photography"
                                date="June 14, 2025"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonthlyPage
