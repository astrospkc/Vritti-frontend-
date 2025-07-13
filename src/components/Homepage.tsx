import React, { useContext } from 'react'

import writeJournal from "../images/writeJournal.jpg"
import readJournal from "../images/readJournal.jpg"
import graph from "../images/graphAnalysis.jpg"
import anonymous from "../images/crushedpaper5.jpg"
import reply from "../images/crushedpaper4.jpg"
import community from "../images/crushedpaper3.jpg"

import "./styles.css"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Homepage = () => {
    const date = new Date()
    const year = date.getFullYear()
    const { isAuthenticated, setIsAuthenticated } = useContext(UserContext)
    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(prev => !prev)

    }
    const navigate = useNavigate()

    const handleButtons = (type) => {
        if (!isAuthenticated) {
            navigate("/error")
        } else {
            if (type == 'journaling') {
                navigate("/new-journals")
            } else if (type == 'dashboard' || type == 'begin') {
                navigate("/dashboard")
            }
        }
    }

    return (
        <>
            <div
                // style={{
                //     background: 'radial-gradient(circle at center, #1a0c2b, #1E293B, #0F172A)',
                // }}
                className='flex flex-col w-full overflow-x-hidden bg-black'>
                <div className='relative w-full h-screen flex flex-col'>
                    <div
                        style={{
                            backgroundImage: `url("/images/forest.jpg")`,
                            height: 500,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat, repeat",
                            backgroundBlendMode: "luminosity",
                            opacity: 0.5,
                            clipPath: "polygon(0% 0%, 100% 0%, 82% 100%, 18% 100%, 0% 38%)",
                            zIndex: 0,
                            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.45)", // Deep realistic shadow
                            filter: "contrast(1.2) brightness(0.9)",

                        }}
                        className='absolute inset-0 shadow-lg shadow-black'
                    ></div>
                    <div
                        className='relative z-10  p-2 shadow-lg shadow-black flex flex-row justify-between '>

                        <div className='font-bold text-violet-300 text-xl '>
                            VRiTTi
                        </div>
                        <ul className='flex flex-row-reverse gap-4 '>
                            {isAuthenticated ?
                                <li
                                    onClick={handleLogout}
                                    className='bg-violet-400 rounded-xl p-2 hover:cursor-pointer'>Logout</li>
                                :
                                <>
                                    <Link to="/signin">
                                        <li className='bg-violet-400 rounded-xl p-2 hover:cursor-pointer'>Login</li>
                                    </Link>
                                    <Link to="/signup">
                                        <li className='bg-violet-400 rounded-xl p-2 hover:cursor-pointer'>SignUp</li>
                                    </Link>
                                </>
                            }

                        </ul>
                    </div>
                    <div className=' w-3/4 m-auto  relative z-10 h-screen flex flex-col justify-center items-center font-serif text-yellow-100 '>
                        <div className=' flex flex-col w-full  text-center '>


                            <div className='flex flex-col items-center justify-center ' >
                                <ul className='text-orange-100  md:text-3xl gap-4 font-serif text-start  '>
                                    <li className='  text-5xl text-bold '><span className='text-7xl'>C</span>APTURE FEELINGS.</li>
                                    <li className='  text-4xl text-bold'><span className='text-7xl'>D</span>ISCOVER PATTERNS.</li>
                                    <li className='  text-4xl text-bold'><span className='text-7xl'>S</span>HARE SUPPORT.</li>


                                </ul>
                                <h1 className='text-2xl text-violet-100 font-sans my-10 text-start'>
                                    Journaling that leads to insight, not isolation.
                                </h1>

                            </div>
                            <div className=' flex flex-row gap-6 '>

                                <div
                                    onClick={() => handleButtons('journaling')}
                                    className='buttons text-xl my-4 p-2 bg-gradient-to-l from-violet-400 to-black shadow-md shadow-black rounded-2xl w-fit mx-auto hover:cursor-pointer hover:shadow-lg hover:shadow-yellow-300 hover:scale-95'>
                                    Start Journaling
                                </div>

                                <div
                                    onClick={() => handleButtons('dashboard')}
                                    className=' buttons text-xl my-4 p-2 bg-gradient-to-l from-violet-400 to-black shadow-md shadow-black rounded-2xl w-fit mx-auto hover:cursor-pointer hover:shadow-lg hover:shadow-yellow-300 hover:scale-95'>
                                    Dashboard
                                </div>

                            </div>
                        </div>



                    </div>
                    <div className='flex flex-row justify-center items-center w-3/4 m-auto '>
                        <div className='flex w-1/2  flex-col border-r-2 border-gray-600 mr-2 pr-4'>
                            <h1
                                className="text-image-fill text-8xl lg:text-9xl font-extrabold"
                                style={{ backgroundImage: 'url("/images/forest.jpg")' }}
                            >
                                VRiTTi
                            </h1>
                            <span className='text-white/30'> A Sanskrit term that captures the essence of conscious thought, fluctuations of the mind, and emotional tides..</span>
                        </div>

                        <div className='flex w-1/2 text-md text-center mt-4 px-4 md:px-20 font-serif text-violet-400  '>
                            A personal, anonymous journaling app that lets you reflect, grow, and connect. Let AI help you understand yourself better — and let community support you ethically.
                        </div>

                    </div>

                </div>


                <div className='flex flex-col min-h-screen w-full p-4 justify-center items-center mt-10  '>

                    {/* Hero Section */}
                    <h1 className='block items-start font-serif text-7xl mb-10 p-2 md:hidden  text-yellow-50 '>FEATURES</h1>

                    {/* Feature Cards */}
                    {/* <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-4/5'> */}
                    <div className='flex flex-col md:flex-row gap-2 w-full md:w-4/5'>
                        <div className='bg-transparent p-4 rounded-3xl shadow-lg shadow-black my-3 border-t-2 border-yellow-400 '>
                            <h1 className='hidden md:block text-emerald-600 text-8xl text-center font-serif font-bold '>FE</h1>
                            <FeatureCard
                                image={writeJournal}
                                title="Daily Journaling"
                                // to="/journals"
                                desc="Capture your thoughts and moods every day in a safe, private space."
                            /></div>
                        <div className='bg-transparent p-4 rounded-3xl shadow-lg shadow-black my-10 border-t-2 border-yellow-400 '>
                            <h1 className='hidden md:block text-emerald-600 text-8xl text-center font-serif font-bold '>A</h1>
                            <FeatureCard
                                image={readJournal}
                                title="AI-Powered Summaries"
                                // to="/journals"
                                desc="Generate meaningful summaries and highlights from your journal entries."
                            /></div>
                        <div className='bg-transparent p-4 rounded-3xl shadow-lg shadow-black my-16 border-t-2 border-yellow-400 '>

                            <h1 className=' hidden md:block text-emerald-600 text-8xl text-center font-serif font-bold '>T</h1>
                            <FeatureCard
                                image={graph}
                                title="Mood Analytics"
                                // to="/weeklyAnalysis"
                                desc="Track your emotions and growth visually over time with charts."
                            />
                        </div>
                        <div className='bg-transparent p-4 rounded-3xl shadow-lg shadow-black my-16 border-t-2 border-yellow-400 '>

                            <h1 className='hidden md:block text-emerald-600 text-8xl text-center font-serif font-bold '>UR</h1>
                            <FeatureCard
                                image={anonymous}
                                title="Anonymous Sharing"
                                // to="/share"
                                desc="Share your insights anonymously and discover others' journeys."
                            />
                        </div>
                        <div className='bg-transparent p-4 rounded-3xl shadow-lg shadow-black my-10 border-t-2 border-yellow-400 '>

                            <h1 className=' hidden md:block text-emerald-600 text-8xl text-center font-serif font-bold '>E</h1>
                            <FeatureCard
                                image={reply}
                                title="Community Feedback"
                                // to="/replies"
                                desc="Receive kind, constructive advice and support from like-minded individuals."
                            />
                        </div>
                        <div className='bg-transparent p-4 rounded-3xl shadow-lg shadow-black my-3 border-t-2 border-yellow-400 '>

                            <h1 className=' hidden md:block text-emerald-600 text-8xl text-center font-serif font-bold '>S</h1><FeatureCard
                                image={community}
                                title="Uplifting Stories"
                                // to="/community"
                                desc="Get inspired by trending experiences and emotional breakthroughs."
                            /></div>

                    </div>


                </div>
                {/* CTA Section */}
                <div className='mt-20 text-center  m-auto justify-center items-center w-3/4'>
                    <h2 className='text-yellow-400 text-4xl mb-4'>Start Your  Journey Today</h2>
                    <p className='text-stone-300 mb-6 px-6'>
                        Whether you’re seeking clarity, growth, or connection — LightMind provides powerful tools to guide your mental and emotional wellness. Unlock voice journaling, personalized analytics, and AI-guided prompts with our premium plan.
                    </p>

                    <div
                        onClick={() => handleButtons('begin')}
                        className='text-xl my-4 p-2 bg-gradient-to-l from-violet-400 to-black shadow-md shadow-black rounded-2xl w-fit mx-auto hover:cursor-pointer hover:shadow-lg text-yellow-400 hover:shadow-yellow-300 hover:scale-95'>
                        ✨ Begin Now
                    </div>

                </div>

                {/* Footer */}
                <div className='mt-20 text-stone-600 text-sm text-center'>
                    © <span>{year}</span> Vritti · Empowering Growth Through Reflection
                </div>


            </div>




        </>

    )
}

const FeatureCard = ({ image, title, desc }) => (

    <div className='bg-zinc-900 p-5 rounded-2xl shadow-md hover:shadow-yellow-400 text-center'>
        <img src={image} alt={title} className='w-full h-48 object-cover rounded-xl mb-4' />
        <h3 className='text-yellow-300 text-2xl font-semibold'>{title}</h3>
        <p className='text-stone-400 mt-2'>{desc}</p>
    </div>

)

export default Homepage