"use client"
import React, { useContext, useEffect, useState } from 'react'
import JournalCard from '../../../components/cards/JournalCard';
import Calendar from 'react-calendar';
import Button from '../../../UIComponent/Button';
import SummarizeChartPage from '../../../components/SummarizeChartPage';
import { journalContext } from '../../../context/JournalContext';

const Analytics = () => {
    const [date, setDate] = useState(new Date());
    const { journals, monthYear, journalObject } = useContext(journalContext)
    // console.log("journals, monthYear, journalObject: ", journals, monthYear, journalObject)
    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedMonthNumber, setSelectedMonthNumber] = useState(0)
    const [monthlyJournalData, setMonthlyJournalData] = useState()
    const [selectedYear, setSelectedYear] = useState("2025")
    const [weekData, setWeekData] = useState()

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    // console.log(journals, monthYear, journalObject)
    const years = Array.from({ length: 51 }, (_, i) => 2024 + i)

    let month
    if (monthYear.length > 0) {
        month = monthYear[0].split(" "[0])
        console.log("month: ", month[0])
        setSelectedMonth
    }

    useEffect(() => {
        setSelectedMonth(month[0])
        const month_num = months.indexOf(month[0]) + 1
        setSelectedMonthNumber(month_num)
    }, [])

    const handleSelectMonth = (e) => {
        const m = e.target.value
        setSelectedMonth(m)
        const monthNumber = months.indexOf(m) + 1;
        setSelectedMonthNumber(monthNumber)
    }
    console.log("select year, month, monthnumber: ", selectedMonth, selectedYear, selectedMonthNumber)

    // TODO: The default analytics will be shown , when year and month selected , then the respective data will be shown
    const handleAnalytics = () => {
        console.log("handling analytics", journals, journalObject)
    }


    const getJournalsByMonthYear = async () => {
        try {
            const token = localStorage.getItem("token")
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weekJournals/fetchMonthJournal?year=${selectedYear}&month=${selectedMonthNumber}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            const result = await res.json()
            setMonthlyJournalData(result)
            return result
        } catch (error) {
            console.error("Failed to fetch month data: ", error)
        }

    }

    const summarizeJournalsByMonthYear = async () => {
        console.log("summarize journals by month year")
        try {
            const token = localStorage.getItem("token")
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weekJournals/summarizeMonthJournal?year=${selectedYear}&month=${selectedMonthNumber}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const result = await res.json()

            // console.log("month data: ", result)
            const jsonResult = JSON.parse(result)
            console.log("json result: ", jsonResult)
            setMonthlyJournalData(jsonResult)
        } catch (error) {
            console.error("Failed to fetch month data: ", error)
        }
    }

    useEffect(() => {
        summarizeJournalsByMonthYear()
    }, [])

    const handleAnalyticsData_Time = (TimeType) => {
        if (TimeType == "Monthly") {
            console.log("time type: ", TimeType)
            // getJournalsByMonthYear()
            summarizeJournalsByMonthYear()
        } else if (TimeType == "Weekly") {
            console.log("time type: ", TimeType)
        } else if (TimeType == "Daily") {
            console.log("time type: ", TimeType)
        }
    }

    console.log("monthly journal data; ", monthlyJournalData)

    // console.log("monthly journal Data: ")

    // const dataOfWeek = (weekNum) => {
    //     const weekJournalData = async () => {
    //         const token = localStorage.getItem("token")
    //         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weekJournals/fetchWeekJournal?year=${selectedYear}&month=${selectedMonthNumber}&week=${weekNum}`, {
    //             method: "GET",
    //             headers: {
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         })
    //         const data = await res.json()
    //         // console.log("data: ", data)
    //         return data
    //     }

    //     weekJournalData().then((data) => {
    //         setWeekData(data)
    //     }).catch((error) => {
    //         console.error("error fetching week data: ", error)
    //     })
    //     console.log("week data: ", weekData)
    // }

    return (
        <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar px-6 py-4">
            {/* Header */}
            <div className="text-4xl md:text-6xl text-violet-400 border-b-2 pb-3 mb-4">
                Analytics
            </div>

            <div className='flex flex-row gap-4 w-full my-3'>
                <div className=' flex-1'>
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
                <div className="text-xl font-bold text-gray-100 flex-1">
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className="bg-black text-sm rounded-xl p-3" />
                </div>


            </div>

            {/* Content Area */}
            <div className="flex flex-col  gap-6 w-full h-full border-t-2 border-gray-500 py-4 my-2">
                {/* Left: Weekly Overview */}
                <div className="flex-1  rounded-xl p-4 shadow-md">
                    <div className="mb-4 flex flex-row gap-4 justify-start items-center">
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
                                    <option value={month} key={index}>
                                        {month}
                                    </option>
                                ))}

                            </select>
                        </div>
                        <div>
                            <Button onclick={handleAnalytics}>Show Analytics</Button>
                        </div>
                    </div>
                    <div className=' border-b-2 p-4 border-gray-700'>
                        <ul className='flex flex-row justify-evenly items-center text-white'>
                            <li
                                onClick={() => handleAnalyticsData_Time("Monthly")}
                                className='border-r-2 border-gray-700 pr-4 hover:border-2 hover:rounded-xl p-2 cursor-pointer'>Monthly Analytics</li>
                            <li
                                onClick={() => handleAnalyticsData_Time("Weekly")}
                                className='border-r-2 border-gray-700 pr-4 hover:border-2 hover:rounded-xl p-2 cursor-pointer'>Weekly Analytics</li>
                            <li
                                onClick={() => handleAnalyticsData_Time("Daily")}
                                className='border-r-2 border-gray-700 pr-4 hover:border-2 hover:rounded-xl p-2 cursor-pointer'>Daily Analytics</li>
                        </ul>

                    </div>
                    <div className='text-8xl text-yellow-100 my-4'>
                        {selectedMonth}
                    </div>


                    <div className="flex w-full justify-between gap-4 px-8 my-4 rounded-xl shadow-lg shadow-black py-4">
                        {["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"].map((week, i) => {

                            // const data = dataOfWeek(i + 1)
                            // console.log("data of week: ", data)

                            console.log("week: ", week)
                            return (
                                <div
                                    key={i}
                                    className="flex-1 bg-black text-white rounded-xl p-6 text-center shadow-lg hover:scale-105 transition-all duration-300"
                                    style={{
                                        boxShadow: "0px 0px 8px 2px rgba(0, 255, 180, 0.6)"
                                    }}
                                >
                                    {week}

                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <SummarizeChartPage result={monthlyJournalData} />
                </div>

                {/* Right: Calendar Panel */}
                {/* <div className="w-full lg:w-[30%]  rounded-xl p-4 shadow-md flex flex-col gap-4">
                        <div className="flex-1 bg-slate-800 rounded-lg shadow-inner p-4">
                            <p className="text-gray-500 text-sm text-center">Calendar component here</p>
                        </div>
                        <div className="flex-1 bg-slate-600 rounded-lg shadow-inner p-4">
                            <p className="text-gray-500 text-sm text-center">Insights or actions</p>
                        </div>
                    </div> */}
            </div>
        </div>
    )
}

export default Analytics
