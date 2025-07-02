
import React, { useContext, useEffect } from 'react'
import Sidebar from './Sidebar'

import { useState } from 'react'
import JournalCard from './cards/JournalCard'
import { groupJournalsByMonthAndWeek } from "./miscellaneous/GetJournalsMonthWeek.js"
import { journalContext } from '../context/JournalContext.jsx'
import WeeklyJournalSection from './WeeklyJournalSection.js'
import usePreviousLocation from '../customHooks/PreviousPage.js'
import { AiFillBackward } from "react-icons/ai";
import { Link, useLocation } from 'react-router-dom'
import { dataTagErrorSymbol } from '@tanstack/react-query'


const NewMonthPage = () => {
    const { monthYear, journalObject } = useContext(journalContext)
    console.log("month year in monthly page: ", journalObject, monthYear)
    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedMonthNumber, setSelectedMonthNumber] = useState(0)
    const [monthlyJournalData, setMonthlyJournalData] = useState()


    const [selectedYear, setSelectedYear] = useState("")
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const years = Array.from({ length: 51 }, (_, i) => 2024 + i)
    // console.log("months")

    // TODO: getting the data passed through link
    const location = useLocation()
    const data = location.state || {}
    // console.log("data passed: ", data)
    // console.log("month number type: ", typeof (data.monthNumber))



    // TODO: get all the monthly data 
    useEffect(() => {
        setSelectedMonth(data.month)
        setSelectedMonthNumber(data.monthNumber)
        setSelectedYear(data.year)
    }, [data])
    useEffect(() => {
        if (!selectedMonthNumber || !selectedYear) return;
        // console.log("selected month, selected year: ", selectedMonthNumber, selectedYear)
        const fetchMonthData = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${import.meta.env.VITE_URL}/weekJournals/fetchMonthJournal?year=${selectedYear}&month=${selectedMonthNumber}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });

                const result = await res.json();
                // console.log("monthly data: ", result);
                setMonthlyJournalData(result)
                return result
            } catch (error) {
                console.error("Failed to fetch month data:", error);
            }
        }

        fetchMonthData()
    }, [selectedMonthNumber, selectedYear])

    const weeks = Object.keys(journalObject[monthYear])

    const handleSelectMonth = (e) => {
        const month = e.target.value
        setSelectedMonth(month)
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const monthNumber = months.indexOf(month) + 1;
        setSelectedMonthNumber(monthNumber);
    }

    // TODO: This is not working , see it later
    const prevLocation = usePreviousLocation()
    console.log("pathname")
    console.log(prevLocation?.pathname)

    console.log("month journal data: ", monthlyJournalData)
    // TODO: when monthly journal data is [] , then open the page newMonthPage  but show some "text" , otherwise [...] , then show all the data weekly


    return (
        <div className='flex flex-row w-full h-screen  '>

            <Sidebar />
            <div className='w-[80%] overflow-y-auto no-scrollbar m-4 my-10'>
                {/* <h1 className='text-emerald-700 text-6xl mb-10'>Monthy Journal</h1> */}
                <div className='flex flex-row gap-4 justify-center items-center rounded-2xl p-2 bg-violet-200/10 shadow-lg shadow-black'>
                    <div className='text-white'>
                        <Link to="/dashboard">
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
                            onChange={handleSelectMonth}
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
        </div>
    )
}

export default NewMonthPage
