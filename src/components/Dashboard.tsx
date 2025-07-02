import React, { useContext, useEffect, useLayoutEffect } from 'react'
import Sidebar from './Sidebar'
import { useState } from 'react'
import MonthlyJournals from './MonthlyJournals'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
// import { groupJournalsByMonthAndWeek } from './miscellaneous/GetJournalsMonthWeek'
// import { journalContext } from '../context/JournalContext'


const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December', 'None'
]

const Dashboard = () => {
    const date = new Date()
    const month = date.toLocaleString("default", { month: "long" });
    const monthNumber = date.getMonth() + 1
    const year = date.getFullYear()
    // console.log("date: ", date.toDateString().split(" ")[1])
    const [selectedMonth, setSelectedMonth] = useState('None')
    const [content, setContent] = useState("")
    const [selectedYear, setSelectedYear] = useState("")
    const years = Array.from({ length: 51 }, (_, i) => 2024 + i)


    // const { journals } = useContext(journalContext)

    const query = useQuery({
        queryKey: ['quote'],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_URL}/openai/getQuote`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            console.log("data in query: ", data)

            return data["quote"]
        }
    })

    useEffect(() => {
        if (query.data) {
            setContent(prev => prev = query.data)

        }
    }, [query.data])

    // TODO: must be completed
    const handleWeek = async (week) => {
        const token = localStorage.getItem('token')
        const res = await fetch(`${import.meta.env.VITE_URL}/weekJournals/fetchWeekJournal?year=${year}&month=${month}&week=${week}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

        })
        const data = await res.json()


        console.log("week clicked: ", week, data)
    }

    const dataToPass = {
        year: year,
        month: month,
        monthNumber: monthNumber
    }


    return (
        <div className='flex flex-row w-full h-screen  '>
            <Sidebar />
            <div className='   overflow-y-auto overflow-x-hidden no-scrollbar m-4 p-4'>
                <div className='m-4 flex flex-col  w-full'>
                    <div
                        style={{ backgroundImage: 'url("/images/forest.jpg")' }}
                        className=' text-5xl md:text-7xl lg:text-9xl my-5 text-emerald-800 font-serif text-image-fill shadow-lg shadow-black rounded-3xl p-2'>Journal Entries</div>
                    <Link to={{ pathname: "/dashboard/newMonthPage" }} state={dataToPass}>

                        <div className='relative w-full   flex flex-col '>
                            <div style={{
                                backgroundImage:
                                    `url("/images/forest.jpg")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: 'black',
                                backgroundBlendMode: '', // optional: helps blend gradient & image
                                // opacity: 0.4,
                                zIndex: 0,
                                // height: 500
                            }}
                                className='absolute rounded-b-xl shadow-lg shadow-black inset-0   opacity-20 hover:opacity-45'
                            >
                            </div>
                            <div
                                className='relative z-10 p-2 flex flex-row  '>
                                <div className='flex flex-col text-6xl text-emerald-600 justify-center items-center'>
                                    <h1>{month}</h1>
                                    <h1>{year}</h1>
                                </div>
                            </div>
                            <div className='text-center yusei-magic-regular justify-center items-center m-auto  text-white text-xl my-5'>
                                {content}
                            </div>
                        </div>
                    </Link>
                    <div className="w-full px-10 no-scrollbar ">
                        <div className="flex flex-row px-8  justify-center items-center m-auto gap-3 overflow-x-auto no-scrollbar py-4">
                            <div className="min-w-[20%] h-[300px] hover:cursor-pointer hover:shadow-sm hover:shadow-orange-600 bg-black shadow-md shadow-emerald-400/60 rounded-xl flex justify-center items-center text-white" onClick={() => handleWeek(1)}>Week 1</div>
                            <div className="min-w-[20%] h-[300px] hover:cursor-pointer hover:shadow-sm hover:shadow-orange-600 bg-black shadow-md shadow-emerald-400/60 rounded-xl flex justify-center items-center text-white" onClick={() => handleWeek(2)} >Week 2</div>
                            <div className="min-w-[20%] h-[300px] hover:cursor-pointer hover:shadow-sm hover:shadow-orange-600 bg-black shadow-md shadow-emerald-400/60 rounded-xl flex justify-center items-center text-white" onClick={() => handleWeek(3)} >Week 3</div>
                            <div className="min-w-[20%] h-[300px] hover:cursor-pointer hover:shadow-sm hover:shadow-orange-600 bg-black shadow-md shadow-emerald-400/60 rounded-xl flex justify-center items-center text-white" onClick={() => handleWeek(4)}>Week 4</div>
                            <div className="min-w-[20%] h-[300px] hover:cursor-pointer hover:shadow-sm hover:shadow-orange-600 bg-black shadow-md shadow-emerald-400/60 rounded-xl flex justify-center items-center text-white" onClick={() => handleWeek(5)}>Week 5</div>

                        </div>
                    </div>

                </div>
                <div className="m-4 w-full border-t-2 border-gray-800 ">
                    <div className='flex flex-col justify-start items-start  my-3 p-3 shadow-lg shadow-black'>
                        <div className="text-xl text-violet-400 yusei-magic-regular my-10 p-2 rounded-xl shadow-sm shadow-orange-600 w-fit">
                            Journals
                        </div>
                        <div className='flex flex-row justify-start items-center px-2 border-2 border-gray-700 w-full rounded-2xl shadow-lg shadow-black'>
                            <div className="w-full flex flex-row gap-2  h-fit  p-4 justify-center items-center">
                                <label className="block text-lg font-medium text-gray-300 mb-2">
                                    Month
                                </label>

                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="w-1/2 p-3 rounded-xl bg-black text-white border border-emerald-500 shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                                >
                                    {months.map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>

                                {/* <div className=" text-center text-emerald-500 text-xl">
                                Selected: <span className="font-bold">{selectedMonth}</span>
                            </div> */}
                            </div>
                            <div className='flex flex-row gap-2'>
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

                    </div>


                    {/* Wrapper with fixed height */}
                    {/* TODO : get all the journals monthly wise , and separate them according to the month, arrange the journals. when month is selected , the selected month journal reaches the top and rest below the one selected */}
                    {
                        selectedMonth &&
                        <MonthlyJournals month={selectedMonth} year={selectedYear} />
                    }


                </div>


            </div>

        </div>
    )
}

export default Dashboard


