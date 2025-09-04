"use client"

import { useContext } from 'react'
import "./globals.css"
import { UserContext } from '@/context/UserContext';
import { AlarmClock, NotebookPen } from 'lucide-react';
import Link from 'next/link';

const Homepage = () => {
    // const year = date.getFullYear()
    const { isAuthenticated, setIsAuthenticated } = useContext(UserContext)

    const handleLogout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem("token")
    }

    return (
        <div>
            <motion.div
                initial={{ y: -100, opacity: 0 }} // Start above and hidden
                animate={{ y: 0, opacity: 1, scale: 1 }} // Slide down and fade in
                transition={{
                    duration: 1,
                    ease: "easeOut",

                }}
                className='flex flex-col w-full overflow-x-hidden '>
                <div className='relative w-full h-screen flex flex-col'>

                    <div
                        className='relative    m-4   rounded-2xl   p-2  flex flex-row justify-between  '>

                        <div className=' flex flex-row items-center   gap-2 font-bold text-black text-2xl knewave-regular  p-2 rounded-xl  '>
                            <span className='bg-yellow-200 p-2 rounded-xl'><NotebookPen /></span>VRiTTi
                        </div>

                        <ul className='flex flex-row-reverse gap-4 '>
                            {isAuthenticated ?
                                <li
                                    onClick={handleLogout}
                                    className='rounded-xl  text-lg text-center hover:cursor-pointer font-bold'>Logout</li>
                                :
                                <>
                                    <Link href="/auth/login">
                                        <li className='bg-orange-400 rounded-xl p-2 hover:cursor-pointer font-bold hover:bg-transparent hover:shadow-lg hover:shadow-orange-400'>Login</li>
                                    </Link>
                                    <Link href="/auth/signin">
                                        <li className='bg-[#A6D8C5] rounded-xl p-2 hover:cursor-pointer font-bold hover:bg-transparent hover:shadow-lg hover:shadow-[#97ccb8]'>SignIn</li>
                                    </Link>
                                </>
                            }

                        </ul>
                    </div>

                    {/* CTA section  */}
                    <div className='flex flex-col w-full m-auto justify-center items-center'>

                        <div className='flex flex-row justify-center items-center  w-2/5 '>
                            <span className='text-white w-fit h-fit  bg-emerald-900 p-2 rounded-lg'><AlarmClock /></span>
                            <span className='text-xs rounded-lg  bg-yellow-200  font-semibold tracking-wider p-2'>Created for  the change and  to share  stories.</span>

                        </div>


                    </div>

                    {/* ------------------------------------------------------------------------------------------ */}
                    {/* Hero Section */}
                    <div className='flex flex-col w-full m-auto justify-center items-center'>
                        <div className='text-8xl bigshot-one-regular w-[60%] text-[#2f5637] text-center tracking-tighter'>
                            Your emotions deserve a safe space.
                        </div>
                        <p className='text-center text-3xl w-[60%] oregano-regular '>
                            Vritti helps you reflect on your day, connect with others, and grow emotionally—one journal entry at a time.
                        </p>
                    </div>

                    {/* ------------------------------------------------------------------------------------------- */}
                    {/* CTA Section */}
                    <div className='flex flex-col justify-center items-center  gap-4 mt-10 roboto-regular text-xl mx-10'>
                        {isAuthenticated ? <Link href="/dashboard">
                            <div
                                className='w-full p-2 rounded-xl underline cursor-pointer font-bold bg-[#2f5637] text-center text-[#F97A00] px-10 hover:bg-transparent '>
                                Start Journaling for Free
                            </div>
                        </Link> : <Link href="/auth/signin">
                            <div className='w-full p-2 rounded-xl underline cursor-pointer font-bold bg-[#2f5637] text-center text-[#F97A00] px-10 '>
                                Start Journaling for Free
                            </div>
                        </Link>}


                        <div className='w-full p-2 rounded-xl underline cursor-pointer font-bold text-center '>
                            See How It Works
                        </div>
                    </div>


                </div>


                {/* illustration  */}
                <div className='w-full py-[10%] relative flex justify-center items-center'>
                    <div className="relative w-[540px] h-[570px]">
                        {/* <!-- Background paper --> */}
                        <div className="absolute inset-0  rounded-lg shadow-md bg-[repeating-linear-gradient(to_bottom,transparent,transparent_23px,rgba(0,0,0,0.2)_24px)] bg-[length:100%_24px]"
                        >
                            <div className="p-4 font-mono text-[#2f5637]">
                                <p className="font-bold">Day1: Cluttered Ideas</p>
                                <p>Today, I had a lot of ideas swirling around in my head. I was feeling overwhelmed and couldn't seem to focus on anything.</p>
                                <p>But then I decided to write them down and see what I could do with them..</p>
                            </div>
                        </div>

                        {/* Girl's illustration (example placeholder) */}

                    </div>
                    <div className="absolute -bottom-1/3 left-1/4  z-10  w-full h-full">
                        <img src="images/Webinar-cuate.svg" alt="girl" className="w-[60%] h-[60%]" />
                    </div>
                    <div className="absolute flex flex-row justify-between -bottom-1/3  z-10  w-full h-full">
                        <div className="flex flex-row w-full justify-between">
                            <div className='flex flex-row -space-x-28 '>
                                <img src="images/Depression-rafiki.svg" alt="girl" className="w-[50%] h-[50%]" />
                                <img src="images/Anxiety-bro.svg" alt="girl" className="w-[50%] h-[50%]" />
                            </div>

                            <div className='flex flex-row -space-x-28'>
                                <img src="images/Psychologist-rafiki.svg" alt="girl" className="w-[50%] h-[50%]" />
                                <img src="images/Shrug-bro.svg" alt="girl" className="w-[50%] h-[50%]" />
                            </div>
                        </div>


                    </div>
                </div>


                {/* video section */}
                <div className='flex w-full h-full  bg-[#F97A00] '>
                    <div className='flex flex-col bg-[#142517] w-full h-full mt-10 p-[5%] '>
                        <div className='flex flex-row  justify-center items-center text-white text-2xl font-bold bg-orange-800 rounded-2xl p-[5%] h-[500px]'>
                            Video
                        </div>
                        <div className='flex flex-row justify-center items-center gap-4 my-10'>
                            <div className='flex flex-col gap-2 text-xs text-white' >
                                <span className='text-[#F97A00] font-bold'>
                                    Reflections & Insights
                                </span>
                                Write or voice your emotions and see them transformed into meaningful reflections you can revisit anytime.
                            </div>
                            <div className='flex flex-col gap-2 text-xs text-white' >
                                <span className='text-[#F97A00] font-bold'>
                                    Shared Stories
                                </span>
                                Choose to share your journals anonymously and connect with others who understand your journey.
                            </div>
                            <div className='flex flex-col gap-2 text-xs text-white' >
                                <span className='text-[#F97A00] font-bold'>
                                    Personal Space
                                </span>
                                A safe space dedicated to all your entries—organized, private, and always accessible to you.
                            </div>
                            <div className='flex flex-col gap-2 text-xs text-white' >
                                <span className='text-[#F97A00] font-bold'>
                                    Community Support
                                </span>
                                Engage with a kind, non-judgmental community where encouragement and empathy matter most.
                            </div>
                            <div className='flex flex-col gap-2 text-xs text-white' >
                                <span className='text-[#F97A00] font-bold'>
                                    Emotional Journey Tracker
                                </span>
                                Visualize your moods and experiences over time with simple, gentle charts and insights.
                            </div>
                        </div>
                    </div>

                </div>

                {/* The journal app people stick iwith */}
                <div className='my-[10%] flex flex-col justify-center items-center text-[#2f5637]'>
                    {/* badge */}
                    <span className='text-xs p-2 bg-yellow-300 rounded-xl '>
                        a kinder place to journal
                    </span>
                    <div className='text-4xl md:text-7xl font-bold bigshot-one-regular w-1/3'>
                        Your stories, your space—grow with others

                    </div>
                    {/* Flow captions */}
                    <div className='flex flex-row justify-between items-center gap-10 mt-[10%]'>
                        <div className='flex flex-col gap-2 text-sm'>
                            <span className='text-xl font-bold' >Capture</span>
                            thoughts, moods and moments
                        </div>
                        <div className='flex flex-col gap-2 text-sm'>
                            <span className='text-xl font-bold' >Reflect</span>
                            organize by tags and feelings
                        </div>
                        <div className='flex flex-col gap-2 text-sm'>
                            <span className='text-xl font-bold' >Connect</span>
                            share anonymously to get supportive ideas
                        </div>
                    </div>
                    <div className='text-4xl text-center mt-[2%] w-3/4 oregano-regular'>
                        Private journaling meets optional anonymous sharing. Learn from real lived experiences and offer help back when you can.
                    </div>

                </div>

                {/* private cloud sync */}
                <div className='w-full my-[10%] flex flex-col justify-center items-center'>
                    {/* badge */}
                    <span className='text-xs p-2 bg-yellow-300 rounded-xl '>
                        mood tracking, daily prompts, and private cloud sync.
                    </span>
                    <div className='flex flex-row items-stretch mx-10'>
                        <div className='flex flex-col justify-center p-10 items-start gap-4 mt-[10%] w-1/3 bg-yellow-200'>
                            <div className='text-4xl md:text-5xl font-bold bigshot-one-regular w-2/3'>
                                Journaling that feels like talking to a friend.
                            </div>
                            <div>
                                No pressure, no rules—just open Vritti, jot down your thoughts, and watch your story come to life with mood charts, AI summaries, and gentle nudges to keep going.
                            </div>
                        </div>
                        <div className='bg-black w-full  mt-5 bigshot-one-regular text-7xl flex justify-center items-center'>
                            Video
                        </div>
                    </div>


                </div>

                {/* single space / calendar */}
                <div className='flex flex-col justify-center items-center '>
                    <div className='text-4xl md:text-7xl font-bold bigshot-one-regular w-2/3 text-[#2f5637] text-center '>
                        A single space to manage every emotion.
                    </div>
                    <div className='text-center text-2xl oregano-regular w-2/3 my-10'>
                        Capture your feelings, track your moods, and reflect on your journey—all in one simple flow.
                        No matter when or where, Vritti keeps your emotions organized.
                    </div>
                    <div className='w-full px-[5%] flex flex-row'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2 p-5'>
                                <span className='text-2xl font-bold border-4 border-black'>
                                    Collect all your reflections
                                </span>
                                Write, record, or note down your emotions effortlessly—everything syncs into your private emotional journal without worry.

                            </div>
                            <div className='flex flex-col gap-2 p-5'>
                                <span className='text-2xl font-bold'>

                                    Share when you’re ready
                                </span>
                                Choose to share reflections with the community at your pace, or keep them safe and private—your story, your control.


                            </div>
                            <div className='flex flex-col gap-2 p-5'>
                                <span className='text-2xl font-bold'>
                                    See your journey clearly
                                </span>
                                Visualize your emotional growth with gentle charts and mood insights, helping you recognize patterns and celebrate progress.

                            </div>
                        </div>
                        <div className='text-5xl bigshot-one-regular'>
                            Calendar
                        </div>

                    </div>


                </div>

                {/* book  */}
                <div className='my-[10%] flex flex-col justify-center items-center '>
                    <div className='relative'>
                        <img src="images/book.svg" alt="book" />
                        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white'>
                            <span className='text-3xl md:text-7xl font-bold bigshot-one-regular text-[#2f5637]'>Your pocket-sized emotional diary.</span>
                            <div className='text-2xl text-[#386641] font-semibold my-10'>Write, reflect, and track how you feel each day. With Vritti, you have a trusted space to clear your mind and understand yourself better.</div>
                        </div>
                    </div>

                    <div className='justify-center  flex flex-row items-center my-[5%]'>
                        <span className='text-3xl md:text-7xl font-bold  text-[#2f5637] w-1/3'>Your Workspace</span>
                        <img src="images/workplace.jpeg" alt="" />

                    </div>
                </div>

                <div className='w-full flex flex-col h-full' style={{
                    backgroundImage: "url('images/OffsetBlobs.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "100vh",
                    width: "100vw",

                }}>
                    <div className='text-4xl md:text-7xl font-bold bigshot-one-regular text-white p-10 w-1/2'>No more bottled emotions.
                        No more silent struggles.</div>
                    <div className='flex flex-col oregano-regular text-[#fcfbfb] text-xl w-1/2 p-10 font-semibold bg-black rounded-2xl mx-4'>
                        <span>Feel lighter every day.
                        </span>
                        Write your thoughts, track your moods, and grow with the support of a caring community.
                        Your safe space to heal, share, and thrive.
                    </div>
                    <div className='text-2xl text-white font-semibold bg-[#567a56] shadow-md shadow-black cursor-pointer w-fit p-2 m-10 hover:bg-black rounded-xl'>
                        It's free, it's private, and it's yours - Try Now.
                    </div>


                </div>
                {/* testimonials and social proof */}


                <div className='text-6xl text-center bigshot-one-regular py-[10%]'>

                    <span className='text-9xl'>VRiTTi</span>

                </div>
                {/* footer section */}
                <Footer />
            </motion.div>
        </div>

    )
}


export default Homepage
