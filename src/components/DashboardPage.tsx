"use client"
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import MonthlyJournals from './MonthlyJournals'


const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December', 'None'
]
const DashboardPage = () => {

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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/openai/getQuote`, {
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weekJournals/fetchWeekJournal?year=${year}&month=${month}&week=${week}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
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
        <div className='   overflow-y-auto overflow-x-hidden no-scrollbar m-4 p-4'>
            <div className='border-b-2'>


                <div className='m-4 flex flex-row  w-full'>
                    <div
                    // style={{ backgroundImage: 'url("/images/forest.jpg")' }}

                    >
                        <span
                            className=' text-5xl md:text-7xl lg:text-9xl my-5 text-[#8dbaa8] font-serif knewave-regular  rounded-3xl p-2 mr-6'

                        >
                            Journal Entries
                        </span>

                        <p className='text-xl mt-6 '>
                            "Write it down, laugh about it later — your future self will thank you."
                        </p>
                    </div>
                    <Link
                        href={{
                            pathname: `dashboard/journalpage/${dataToPass.year}/${dataToPass.month}/${dataToPass.monthNumber}`,
                            // query: { year: dataToPass.year, month: dataToPass.month, monthNumber: dataToPass.monthNumber },
                        }}
                    >

                        <div className='relative w-full mx-4   flex flex-col  '>
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
                                className='absolute rounded-xl shadow-lg shadow-black inset-0   opacity-20 hover:opacity-40 '
                            >
                            </div>
                            <div
                                className='relative z-10 p-2 flex flex-row  '>
                                <div className='flex flex-col text-8xl text-orange-900  justify-cente marck-script-regular items-center'>
                                    <h1>{month}</h1>
                                    <h1>{year}</h1>
                                </div>
                            </div>
                            <div className='p-4 text-center yusei-magic-regular justify-center items-center m-auto marck-script-regular text-black font-bold text-2xl my-5'>
                                {content}
                            </div>
                        </div>
                    </Link>


                </div>
                <div className="w-full px-10  ">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 px-8  justify-center items-center m-auto gap-3 overflow-x-auto no-scrollbar py-4">
                        <div className="min-w-[15%] h-[200px]  hover:cursor-pointer hover:shadow-sm hover:shadow-orange-600 shadow-md shadow-orange-900 rounded-xl flex justify-center items-center text-orange-400 text-2xl font-semibold" onClick={() => handleWeek(1)}>Week 1</div>
                        <div className="min-w-[15%] h-[200px]  hover:cursor-pointer hover:shadow-sm hover:shadow-orange-600 shadow-md shadow-orange-900 rounded-xl flex justify-center items-center text-orange-400 text-2xl font-semibold" onClick={() => handleWeek(2)} >Week 2</div>
                        <div className="min-w-[15%] h-[200px]  hover:cursor-pointer hover:shadow-sm hover:shadow-orange-600 shadow-md shadow-orange-900 rounded-xl flex justify-center items-center text-orange-400 text-2xl font-semibold" onClick={() => handleWeek(3)} >Week 3</div>
                        <div className="min-w-[15%] h-[200px]  hover:cursor-pointer hover:shadow-sm hover:shadow-orange-600 shadow-md shadow-orange-900 rounded-xl flex justify-center items-center text-orange-400 text-2xl font-semibold" onClick={() => handleWeek(4)}>Week 4</div>
                        <div className="min-w-[15%] h-[200px]  hover:cursor-pointer hover:shadow-sm hover:shadow-orange-600 shadow-md shadow-orange-900 rounded-xl flex justify-center items-center text-orange-400 text-2xl font-semibold" onClick={() => handleWeek(5)}>Week 5</div>

                    </div>
                </div>
            </div>
            <div className="m-4 w-full border-t-2 border-gray-800 ">
                <div className='flex flex-col justify-start items-start  my-3 p-3 '>
                    <div className="text-5xl marck-script-regular text- text-black yusei-magic-regular my-10 p-4 rounded-xl shadow-lg shadow-[#8dbaa8] w-fit">
                        Journals
                    </div>
                    <div className='flex flex-row justify-start items-center px-2  w-full rounded-2xl shadow-lg shadow-gray-500/40'>
                        <div className="w-full flex flex-row gap-2  h-fit  p-4 justify-center items-center">
                            <label className="block text-lg font-medium text-gray-600 mb-2">
                                Month
                            </label>

                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="w-1/2 p-4 rounded-xl bg-[#E0E0E0] text-white border border-emerald-500 shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
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
    )
}

export default DashboardPage
