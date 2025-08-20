"use client"
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import MonthlyJournals from './MonthlyJournals'
import Image from 'next/image'
import { CardBody, CardContainer, CardItem } from './ui/3d-card'
import Footer from './Footer'



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
        <div>
            {/* Your recent saved articles */}
            <div className='my-10 flex flex-col justify-center items-center'>
                <div className='flex flex-row justify-center items-center'>
                    <div className='flex flex-col gap-2 w-[60%] '>
                        <div className='text-md text-start font-semibold tracking-tighter text-[#0e3b29]'>
                            {content}
                        </div>
                        <span className='text-2xl  md:text-7xl  text-start  boldonse-regular tracking-tighter text-[#0e3b29]'>Recent Saved Articles</span>
                        {/* One Card will reside here */}
                    </div>
                    <div className='w-full'>
                        <ThreeDCardDemo />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                    <ThreeDCardDemo />
                    <ThreeDCardDemo />
                    <ThreeDCardDemo />
                    <ThreeDCardDemo />
                    {/* <ThreeDCardDemo /> */}
                    <span className='text-xl font-bold cursor-pointer hover:bg-[#ef9f8f] bg-black p-2 w-fit  hover:scale-95 translate-1 duration-100 rounded-xl  text-white'>+ Load More</span>
                </div>


            </div>
            {/* Your recent journals */}
            <div className=' flex flex-col justify-center items-center my-10'>
                <div>
                    <span className='text-2xl md:text-7xl underline  p-2 rounded-xl  boldonse-regular tracking-tighter text-[#0e3b29]'>Recent Journals</span>
                </div>
                <div className='grid grid-cols-2 gap-3 '>
                    <ThreeDCardDemo />
                    <ThreeDCardDemo />

                    {/* <ThreeDCardDemo /> */}
                    <span className='text-xl font-bold cursor-pointer hover:bg-[#ef9f8f] bg-black p-2 w-fit  hover:scale-95 translate-1 duration-100 rounded-xl  text-white'>+ Load More</span>
                </div>
            </div>
            {/* Analytics */}
            <div className='my-10'>
                <div>
                    <span className='text-2xl  oregano-regular tracking-tighter text-[#0e3b29]'>Analytics</span>
                </div>
            </div>
            {/* your community engagement */}
            <div className='my-10 flex flex-col justify-center items-center'>
                <div className='py-6 w-1/3'>
                    <span className='text-2xl md:text-7xl  boldonse-regular tracking-tighter text-[#0e3b29]'>Community Engagement</span>
                </div>
                <div className='flex flex-row gap-4'>
                    <div className='w-[200px] h-[200px] shadow-lg shadow-[#0e3b29] rounded-xl flex justify-center items-center'>
                        card
                    </div>
                    <div className='w-[200px] h-[200px] shadow-lg shadow-[#0e3b29] rounded-xl flex justify-center items-center'>
                        card
                    </div>
                    <div className='w-[200px] h-[200px] shadow-lg shadow-[#0e3b29] rounded-xl flex justify-center items-center'>
                        card
                    </div>
                    <div className='w-[200px] h-[200px] shadow-lg shadow-[#0e3b29] rounded-xl flex justify-center items-center'>
                        card
                    </div>

                </div>

            </div>

        </div>
    )
}

export default DashboardPage



export function ThreeDCardDemo() {
    return (
        <CardContainer className="inter-var shadow-lg shadow-[#ece3db] rounded-2xl ">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                    Make things float in air
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                    Hover over this card to unleash the power of CSS perspective
                </CardItem>
                <CardItem
                    translateZ="100"
                    rotateX={20}
                    rotateZ={-10}
                    className="w-full mt-4"
                >
                    <img
                        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        height="1000"
                        width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                    />
                </CardItem>
                <div className="flex justify-between items-center mt-20">
                    <CardItem
                        translateZ={20}
                        translateX={-40}
                        as="button"
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                        Try now →
                    </CardItem>
                    <CardItem
                        translateZ={20}
                        translateX={40}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                        Open
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}

//     < div
// className = '   overflow-y-auto overflow-x-hidden no-scrollbar m-4 p-4'


//     >
//     <div>
//         <div className='border-b-2'>


//             <div className='m-4 flex flex-row  w-full'>
//                 <div
//                 // style={{ backgroundImage: 'url("/images/forest.jpg")' }}

//                 >
//                     <span
//                         className=' text-5xl md:text-7xl lg:text-9xl my-5 text-[#8dbaa8] font-serif knewave-regular  rounded-3xl p-2 mr-6'

//                     >
//                         Journal Entries
//                     </span>

//                     <p className='text-xl mt-6 '>
//                         "Write it down, laugh about it later — your future self will thank you."
//                     </p>
//                 </div>
//                 <Link
//                     href={{
//                         pathname: `dashboard/journalpage/${dataToPass.year}/${dataToPass.month}/${dataToPass.monthNumber}`,
//                         // query: { year: dataToPass.year, month: dataToPass.month, monthNumber: dataToPass.monthNumber },
//                     }}
//                 >

//                     <div className='relative w-full mx-4   flex flex-col  '>
//                         <div style={{
//                             backgroundImage:
//                                 `url("/images/forest.jpg")`,
//                             backgroundSize: 'cover',
//                             backgroundPosition: 'center',
//                             backgroundRepeat: 'no-repeat',
//                             backgroundColor: 'black',
//                             backgroundBlendMode: '', // optional: helps blend gradient & image
//                             // opacity: 0.4,
//                             zIndex: 0,
//                             // height: 500
//                         }}
//                             className='absolute rounded-xl shadow-lg shadow-black inset-0   opacity-20 hover:opacity-40 '
//                         >
//                         </div>
//                         <div
//                             className='relative z-10 p-2 flex flex-row  '>
//                             <div className='flex flex-col text-8xl text-orange-900  justify-cente marck-script-regular items-center'>
//                                 <h1>{month}</h1>
//                                 <h1>{year}</h1>
//                             </div>
//                         </div>
//                         <div className='p-4 text-center yusei-magic-regular justify-center items-center m-auto marck-script-regular text-black font-bold text-2xl my-5'>
//                             {content}
//                         </div>
//                     </div>
//                 </Link>
//             </div>
//             <div className="w-full px-10  ">
//                 <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 px-8  justify-center items-center m-auto gap-3 overflow-x-auto no-scrollbar py-4">
//                     <div className="min-w-[15%] h-[200px]  hover:cursor-pointer hover:shadow-sm hover:shadow-orange-600 shadow-md shadow-orange-900 rounded-xl flex justify-center items-center text-orange-400 text-2xl font-semibold" onClick={() => handleWeek(1)}>Week 1</div>
//                     <div className="min-w-[15%] h-[200px]  hover:cursor-pointer hover:shadow-sm hover:shadow-orange-600 shadow-md shadow-orange-900 rounded-xl flex justify-center items-center text-orange-400 text-2xl font-semibold" onClick={() => handleWeek(2)} >Week 2</div>
//                     <div className="min-w-[15%] h-[200px]  hover:cursor-pointer hover:shadow-sm hover:shadow-orange-600 shadow-md shadow-orange-900 rounded-xl flex justify-center items-center text-orange-400 text-2xl font-semibold" onClick={() => handleWeek(3)} >Week 3</div>
//                     <div className="min-w-[15%] h-[200px]  hover:cursor-pointer hover:shadow-sm hover:shadow-orange-600 shadow-md shadow-orange-900 rounded-xl flex justify-center items-center text-orange-400 text-2xl font-semibold" onClick={() => handleWeek(4)}>Week 4</div>
//                     <div className="min-w-[15%] h-[200px]  hover:cursor-pointer hover:shadow-sm hover:shadow-orange-600 shadow-md shadow-orange-900 rounded-xl flex justify-center items-center text-orange-400 text-2xl font-semibold" onClick={() => handleWeek(5)}>Week 5</div>

//                 </div>
//             </div>
//         </div>
//         <div className="m-4 w-full border-t-2 border-gray-800 ">
//             <div className='flex flex-col justify-start items-start  my-3 p-3 '>
//                 <div className="text-5xl marck-script-regular text- text-black yusei-magic-regular my-10 p-4 rounded-xl shadow-lg shadow-[#8dbaa8] w-fit">
//                     Journals
//                 </div>
//                 <div className='flex flex-row justify-start items-center px-2  w-full rounded-2xl shadow-lg shadow-gray-500/40'>
//                     <div className="w-full flex flex-row gap-2  h-fit  p-4 justify-center items-center">
//                         <label className="block text-lg font-medium text-gray-600 mb-2">
//                             Month
//                         </label>

//                         <select
//                             value={selectedMonth}
//                             onChange={(e) => setSelectedMonth(e.target.value)}
//                             className="w-1/2 p-4 rounded-xl bg-[#E0E0E0] text-white border border-emerald-500 shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
//                         >
//                             {months.map((month) => (
//                                 <option key={month} value={month}>
//                                     {month}
//                                 </option>
//                             ))}
//                         </select>

//                         {/* <div className=" text-center text-emerald-500 text-xl">
//                                 Selected: <span className="font-bold">{selectedMonth}</span>
//                             </div> */}
//                     </div>
//                     <div className='flex flex-row gap-2'>
//                         <label className='text-white mx-2' >Year</label>
//                         <select
//                             name=""
//                             id=""
//                             value={selectedYear}
//                             onChange={(e) => setSelectedYear(e.target.value)}
//                             className='rounded-xl bg-gray-300'
//                         >
//                             <option value="" disabled >Search with year</option>
//                             {years.map((year, index) => (
//                                 <option value={index + 1} key={index}>
//                                     {year}
//                                 </option>
//                             ))}

//                         </select>
//                     </div>
//                 </div>

//             </div>


//             {/* Wrapper with fixed height */}
//             {/* TODO : get all the journals monthly wise , and separate them according to the month, arrange the journals. when month is selected , the selected month journal reaches the top and rest below the one selected */}
//             {
//                 selectedMonth &&
//                 <MonthlyJournals month={selectedMonth} year={selectedYear} />
//             }


//         </div>


//     </div>
//         </div >
