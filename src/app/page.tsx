"use client"

import React, { useContext, useState, useEffect } from 'react'
import "./globals.css"
import writeJournal from "../images/writeJournal.jpg"
import readJournal from "../images/readJournal.jpg"
import graph from "../images/graphAnalysis.jpg"
import anonymous from "../images/crushedpaper5.jpg"
import reply from "../images/crushedpaper4.jpg"
import community from "../images/crushedpaper3.jpg"
import { motion } from "motion/react"
import Link from 'next/link'
import { UserContext } from '../context/UserContext'
import { useRouter } from 'next/navigation'

import Image from 'next/image'



const Homepage = () => {
    const [date, setDate] = useState<string | null>(null);
    const [year, setYear] = useState()
    useEffect(() => {
        const now = new Date();
        setDate(now.toString());
        setYear(now.getFullYear())
    }, []);
    // const year = date.getFullYear()
    const { isAuthenticated, setIsAuthenticated } = useContext(UserContext)
    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(prev => !prev)
    }

    const router = useRouter()

    const handleButtons = (type: string) => {
        if (!isAuthenticated) {
            router.push("/error")
        } else {
            if (type == 'journaling') {
                router.push("/newJournalEntry")
            } else if (type == 'dashboard' || type == 'begin') {
                router.push("/dashboard")
            }
        }
    }

    return (
        <>
            <motion.div


                className='flex flex-col w-full overflow-x-hidden '>
                <div className='relative w-full h-screen flex flex-col'>
                    <div
                        suppressHydrationWarning
                        style={{
                            backgroundImage: `url("/images/crushedpaper4.jpg")`,
                            // height: 500,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat, repeat",
                            backgroundBlendMode: "luminosity",
                            opacity: 0.1,
                            // clipPath: "polygon(0% 0%, 100% 0%, 82% 100%, 18% 100%, 0% 38%)",
                            zIndex: 0,
                            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.45)", // Deep realistic shadow
                            filter: "contrast(1.2) brightness(0.9)",

                        }}
                        className='absolute inset-0 shadow-lg shadow-[#E0E0E0]'
                    ></div>
                    <div
                        className='relative z-10   p-2 shadow-lg shadow-[#E0E0E0] flex flex-row justify-between '>

                        <div className='font-bold text-orange-900 text-2xl knewave-regular '>
                            VRiTTi
                        </div>
                        <ul className='flex flex-row-reverse gap-4 '>
                            {isAuthenticated ?
                                <li
                                    onClick={handleLogout}
                                    className='bg-[#A6D8C5] rounded-xl p-2 hover:cursor-pointer font-bold'>Logout</li>
                                :
                                <>
                                    <Link href="/auth/login">
                                        <li className='bg-orange-400 rounded-xl p-2 hover:cursor-pointer'>Login</li>
                                    </Link>
                                    <Link href="/auth/signin">
                                        <li className='bg-violet-400 rounded-xl p-2 hover:cursor-pointer'>SignIn</li>
                                    </Link>
                                </>
                            }

                        </ul>
                    </div>

                    {/* ------------------------------------------------------------------------------------------ */}
                    <div className='flex flex-col w-full m-auto justify-center items-center'>
                        <span
                            className="text-orange-500 text-8xl font-extrabold knewave-regular"
                        // style={{ backgroundImage: 'url("/images/forest.jpg")' }}
                        >
                            VRiTTi
                        </span>
                        <div className='flex flex-row justify-center items-center m-auto mx-10 mt-10 '>
                            <div className='flex-1 flex flex-col justify-center items-center shadow-lg p-4 rounded-3xl' >
                                <div className='w-1/2 flex flex-col items-center justify-center gap-6'>
                                    <span
                                        className="text-orange-500 text-2xl font-extrabold knewave-regular"
                                    // style={{ backgroundImage: 'url("/images/forest.jpg")' }}
                                    >
                                        VRiTTi
                                    </span>
                                    <div className='text-gray-400 w-3/4'> A Sanskrit term that captures the essence of conscious thought, fluctuations of the mind, and emotional tides..</div>
                                </div>

                                <ul className='  md:text-3xl gap-4 font-serif text-start text-orange-900 marck-script-regular '>
                                    <li className='  text-4xl font-thin font '><span className='text-7xl'>C</span>apture feelings.</li>
                                    <li className='  text-4xl text-extrabold'><span className='text-7xl'>D</span>iscover patterns</li>
                                    <li className='  text-4xl text-extrabold'><span className='text-7xl'>S</span>hare support.</li>


                                </ul>
                                <div className='text-2xl text- font-sans text-gray-500 my-10 text-start marck-script-regular'>
                                    Journaling that leads to insight, not isolation.
                                </div>
                            </div>
                            {/* ///// */}
                            <div className='flex-1  justify-center items-center  m-auto '>
                                <div className='flex text-xl text-center mt-4 px-4 md:px-20 font-serif text-[#8dbaa8] rounded-full p-4 font-semibold border-r-2 '>
                                    A personal, anonymous journaling app that lets you reflect, grow, and connect. Let AI help you understand yourself better — and let community support you ethically.
                                </div>
                                <div className=' flex flex-row gap-3 '>

                                    <div
                                        onClick={() => handleButtons('journaling')}
                                        className='buttons font-semibold text-xl my-4 p-2 z-10 text-orange-400 bg-black shadow-md shadow-[#2B2B2B] rounded-2xl w-fit mx-auto hover:cursor-pointer hover:shadow-lg hover:shadow-orange-300 hover:scale-95 '>
                                        Start Journaling
                                    </div>

                                    <div
                                        onClick={() => handleButtons('dashboard')}
                                        className=' buttons font-semibold text-xl z-10 my-4 p-2 bg-gradient-to-l  shadow-md shadow-[#2B2B2B] rounded-2xl w-fit mx-auto hover:cursor-pointer hover:shadow-lg hover:shadow-orange-300 hover:scale-95 text-orange-600 '>
                                        Dashboard
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>

                    {/* ------------------------------------------------------------------------------------------- */}


                </div>


                <div className='flex flex-col min-h-screen w-full p-4 justify-center items-center mt-10   '>

                    {/* Hero Section  text-[#F29C50]*/}
                    <span className='flex items-start font-serif font-bold text-7xl mb-10 p-2  border-b-2 text-gray-500 '>FEATURES</span>

                    {/* Feature Cards */}
                    <div className='grid grid-cols-3 gap-2 w-full md:w-4/5 '>
                        <div className='bg-transparent p-4 rounded-3xl shadow-lg shadow-[#A6D8C5] my-3 border-t-2 border-yellow-400 '>
                            {/* <h1 className='hidden md:block text-emerald-600 text-8xl text-center font-serif font-bold '>FE</h1> */}
                            <FeatureCard
                                image={writeJournal}
                                title="Daily Journaling"
                                desc="Capture your thoughts and moods every day in a safe, private space."
                            /></div>
                        <div className='bg-transparent p-4 rounded-3xl shadow-lg shadow-[#A6D8C5] my-10 border-t-2 border-yellow-400 '>
                            {/* <h1 className='hidden md:block text-emerald-600 text-8xl text-center font-serif font-bold '>A</h1> */}
                            <FeatureCard
                                image={readJournal}
                                title="AI-Powered Summaries"
                                desc="Generate meaningful summaries and highlights from your journal entries."
                            /></div>
                        <div className='bg-transparent p-4 rounded-3xl shadow-lg shadow-[#A6D8C5] my-16 border-t-2 border-yellow-400 '>

                            {/* <h1 className=' hidden md:block text-emerald-600 text-8xl text-center font-serif font-bold '>T</h1> */}
                            <FeatureCard
                                image={graph}
                                title="Mood Analytics"
                                desc="Track your emotions and growth visually over time with charts."
                            />
                        </div>
                        <div className='bg-transparent p-4 rounded-3xl shadow-lg shadow-[#A6D8C5] my-16 border-t-2 border-yellow-400 '>

                            {/* <h1 className='hidden md:block text-emerald-600 text-8xl text-center font-serif font-bold '>UR</h1> */}
                            <FeatureCard
                                image={anonymous}
                                title="Anonymous Sharing"
                                desc="Share your insights anonymously and discover others' journeys."
                            />
                        </div>
                        <div className='bg-transparent p-4 rounded-3xl shadow-lg shadow-[#A6D8C5] my-10 border-t-2 border-yellow-400 '>

                            {/* <h1 className=' hidden md:block text-emerald-600 text-8xl text-center font-serif font-bold '>E</h1> */}
                            <FeatureCard
                                image={reply}
                                title="Community Feedback"
                                desc="Receive kind, constructive advice and support from like-minded individuals."
                            />
                        </div>
                        <div className='bg-transparent p-4 rounded-3xl shadow-lg shadow-[#A6D8C5] my-3 border-t-2 border-yellow-400 '>

                            {/* <h1 className=' hidden md:block text-emerald-600 text-8xl text-center font-serif font-bold '>S</h1> */}
                            <FeatureCard
                                image={community}
                                title="Uplifting Stories"
                                desc="Get inspired by trending experiences and emotional breakthroughs."
                            /></div>

                    </div>


                </div>
                {/* CTA Section */}
                <div className='mt-20 text-center  m-auto justify-center items-center w-3/4 bg-[#E0E0E0] p-4 rounded-4xl shadow-lg shadow-[#2B2B2B]'>
                    <span className='text-orange-600 text-4xl mb-4'>Start Your  Journey Today</span>
                    <p className='text-stone-900 mb-6 px-6 '>
                        Whether you’re seeking clarity, growth, or connection — LightMind provides powerful tools to guide your mental and emotional wellness. Unlock voice journaling, personalized analytics, and AI-guided prompts with our premium plan.
                    </p>

                    <div
                        onClick={() => handleButtons('begin')}
                        className='text-xl my-4 p-2 bg-gradient-to-l  bg-black shadow-md shadow-black rounded-2xl w-fit mx-auto hover:cursor-pointer hover:shadow-lg text-orange-400 hover:shadow-orange-300 hover:scale-95'>
                        ✨ Begin Now
                    </div>

                </div>

                {/* Footer */}
                <div className='mt-20 text-stone-600 text-sm text-center'>
                    © <span>{year}</span> Vritti · Empowering Growth Through Reflection
                </div>


            </motion.div>




        </>

    )
}

const FeatureCard = ({ image, title, desc }) => (

    <div className='bg-[#E0E0E0] p-5 rounded-2xl shadow-lg hover:shadow-[#2B2B2B] text-center'>
        <Image
            src={image}
            alt={title}
            className='w-full h-48 object-cover rounded-xl mb-4'
            width={400}
            height={200}
        />
        <span className='text-orange-700 text-2xl font-semibold'>{title}</span>
        <p className='text-stone-800 mt-2'>{desc}</p>
    </div>

)

export default Homepage


// suppressHydrationWarning
// style={{
//     backgroundImage: `url("/images/forest.jpg")`,
//     // height: 500,
//     backgroundSize: "cover",
//     backgroundRepeat: "no-repeat, repeat",
//     backgroundBlendMode: "luminosity",
//     opacity: 0.2,
//     // clipPath: "polygon(0% 0%, 100% 0%, 82% 100%, 18% 100%, 0% 38%)",
//     zIndex: 0,
//     boxShadow: "0 20px 60px rgba(0, 0, 0, 0.45)", // Deep realistic shadow
//     filter: "contrast(1.2) brightness(0.9)",

// }}