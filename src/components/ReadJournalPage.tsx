import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Button from '../UIComponent/Button'


const ReadJournalPage = () => {
    const location = useLocation()
    console.log("location: ", location)
    const data = location.state || {}
    console.log("title, subtitle, bosy, date : ", data?.title, " ", data?.subtitle, " ", data?.body, " ", data?.date)
    return (
        <div className='flex flex-row w-full h-screen '>
            <Sidebar currentPage="community" />
            <div className=' w-[80%]  overflow-y-auto no-scrollbar m-4'>
                <Link to="/dashboard/monthlypage">
                    <Button>Back</Button>

                </Link>
                <div className='flex flex-col justify-center items-center'>
                    <div className=' text-5xl text-violet-400 my-2 p-3 rounded-xl shadow-lg shadow-violet-800/60'>

                        Read the journal
                    </div>
                    <div className='mx-4 shadow-lg shadow-orange-500 p-3 rounded-2xl'>
                        <img src="../images/openbooks.jpg" alt="" height={400} />
                        <div>
                            <h1 className='text-6xl text-yellow-100 '>{data?.title.toUpperCase()}</h1>
                            <h2 className='text-xl text-yellow-50 pb-3'>{data?.subtitle}</h2>
                            <h1 className='text-lg text-gray-500 py-2'>{data?.date}</h1>
                            <div className='bg-gray-600 border-t-2 border-gray-500 mb-4'></div>
                            <div className=' text-lg text-white py-4 mb-10  rounded-xl'>
                                {data?.body}
                            </div>
                        </div>
                    </div>
                    <div className='justify-start flex flex-row gap-4 mt-5'>
                        <Button>EDIT</Button>
                        <Button>DONE READ</Button>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default ReadJournalPage
