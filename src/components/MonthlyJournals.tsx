import React, { useContext } from 'react'
import { groupJournalsByMonthAndWeek } from './miscellaneous/GetJournalsMonthWeek'
import { journalContext } from '../context/JournalContext'
import { Link } from 'react-router-dom'

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
                        <Link key={i} to="/dashboard/monthlypage">
                            <div
                                key={i}
                                className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-lg hover:shadow-md hover:shadow-orange-500">
                                {/* Background image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-20 hover:opacity-40 transition duration-300 shadow-xl shadow-black"
                                    style={{
                                        backgroundImage: `url("/images/glasseffect.jpg")`,

                                    }}
                                />

                                {/* Foreground content */}

                                <div

                                    className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full h-full p-6 gap-4 hover:cursor-pointer ">
                                    <div className=" text-5xl md:text-8xl text-emerald-600 mb-6 rotate-0 md:rotate-90 text-center md:text-start ">
                                        {month.toUpperCase()}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 w-[60%]  ">
                                        <div className="bg-black text-white p-4 rounded-xl text-center w-[100px] md:w-[200px] h-[100px] md:h-[150px] shadow-md shadow-emerald-700 ">Week 1</div>
                                        <div className="bg-black text-white p-4 rounded-xl text-center w-[100px] md:w-[200px] h-[100px] md:h-[150px] shadow-md shadow-emerald-700 ">Week 2</div>
                                        <div className="bg-black text-white p-4 rounded-xl text-center w-[100px] md:w-[200px] h-[100px] md:h-[150px] shadow-md shadow-emerald-700 ">Week 3</div>
                                        <div className="bg-black text-white p-4 rounded-xl text-center w-[100px] md:w-[200px] h-[100px] md:h-[150px] shadow-md shadow-emerald-700 ">Week 4</div>
                                        <div className="bg-black text-white p-4 rounded-xl text-center w-[100px] md:w-[200px] h-[100px] md:h-[150px] shadow-md shadow-emerald-700 ">Week 5</div>

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
