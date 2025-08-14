"use client"
import React, { useContext } from 'react'
import { groupJournalsByMonthAndWeek } from './miscellaneous/GetJournalsMonthWeek'
import { journalContext } from '../context/JournalContext'
import Link from 'next/link'


const MonthlyJournals = ({ month, year }) => {
    const { journals, monthYear } = useContext(journalContext)
    const data = groupJournalsByMonthAndWeek(journals)

    // const m = monthYear[0].split(" ")[0]
    // console.log(m)
    // console.log("data: ", data, monthYear,)
    // const week = Object.keys(data[monthYear])
    // console.log("week: ", week)
    console.log("journals: ", journals)
    return (
        <div>
            {
                monthYear && monthYear.map((month, i) => {
                    const weekNum = Object.keys(data[monthYear])
                    console.log("week num: ", weekNum)

                    return (
                        <Link key={i} href="/dashboard/journalpage">
                            <div
                                key={i}
                                className="relative w-full  overflow-hidden rounded-xl shadow-lg hover:shadow-md hover:shadow-emerald-800">
                                {/* Background image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-20 hover:opacity-40 transition duration-300 shadow-xl shadow-black"
                                    style={{
                                        backgroundImage: `url("/images/glasseffect.jpg")`,
                                        opacity: 0.2

                                    }}
                                />

                                {/* Foreground content */}

                                <div

                                    className=" z-10  relative flex flex-col hover:bg-gra items-center justify-center w-full h-full p-6 gap-4 hover:cursor-pointer ">
                                    <div className='flex flex-row gap-4 w-full'>
                                        <div className=" flex w-[40%] text-8xl   text-orange-900 font-sans font-bold mb-6 rotate-0  text-center md:text-start ">
                                            {month}
                                        </div>
                                        <div className='flex w-[60%] '>
                                            {/* for image */}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5 gap-4   ">
                                        <div className="bg-orange-100 text-orange-900 text-xl font-bold p-4 rounded-xl text-center w-[100px] md:w-[200px] h-[100px] md:h-[150px] shadow-md shadow-orange-300/90 ">Week 1</div>
                                        <div className="bg-orange-100 text-orange-900 text-xl font-bold p-4 rounded-xl text-center w-[100px] md:w-[200px] h-[100px] md:h-[150px] shadow-md shadow-orange-300/90 ">Week 2</div>
                                        <div className="bg-orange-100 text-orange-900 text-xl font-bold p-4 rounded-xl text-center w-[100px] md:w-[200px] h-[100px] md:h-[150px] shadow-md shadow-orange-300/90 ">Week 3</div>
                                        <div className="bg-orange-100 text-orange-900 text-xl font-bold p-4 rounded-xl text-center w-[100px] md:w-[200px] h-[100px] md:h-[150px] shadow-md shadow-orange-300/90 ">Week 4</div>
                                        <div className="bg-orange-100 text-orange-900 text-xl font-bold p-4 rounded-xl text-center w-[100px] md:w-[200px] h-[100px] md:h-[150px] shadow-md shadow-orange-300/90 ">Week 5</div>
                                    </div>
                                </div>
                            </div>
                        </Link>

                    )
                }

                )}
        </div>
    )
}

export default MonthlyJournals
