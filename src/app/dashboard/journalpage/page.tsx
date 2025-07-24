"use client"
import React, { useContext, useState } from 'react'

import { AiFillBackward } from "react-icons/ai";

import { journalContext } from '../../../context/JournalContext';
import usePreviousLocation from '../../../customHooks/PreviousPage';
import WeeklyJournalSection from '../../../components/WeeklyJournalSection';
import Link from 'next/link';


const JournalPage = () => {
    const { journals, monthYear, journalObject } = useContext(journalContext)
    console.log("month year in monthly page: ", journalObject, monthYear)
    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedYear, setSelectedYear] = useState("")
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const years = Array.from({ length: 51 }, (_, i) => 2024 + i)
    console.log("months")


    const weeks = Object.keys(journalObject[monthYear])

    // TODO: This is not working , see it later
    const prevLocation = usePreviousLocation()
    console.log("pathname")
    console.log(prevLocation?.pathname)


    return (
        <div className='w-[80%] overflow-y-auto no-scrollbar m-4 my-10'>
            {/* <h1 className='text-emerald-700 text-6xl mb-10'>Monthy Journal</h1> */}
            <div className='flex flex-row gap-4 justify-center items-center rounded-2xl p-2 bg-violet-200/10 shadow-lg shadow-black'>
                <div className='text-white'>
                    <Link href="/dashboard">
                        <AiFillBackward className='text-white text-2xl hover:scale-110 hover:text-orange-500 hover:cursor-pointer' />

                    </Link>
                </div>
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
            {/* according to the data , weekly dividing journals */}
            {
                weeks && weeks.map((week, i) => (
                    <WeeklyJournalSection key={i} week={week} />
                ))
            }

        </div>

    )
}

export default JournalPage
