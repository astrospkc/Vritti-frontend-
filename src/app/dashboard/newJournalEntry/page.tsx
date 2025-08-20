
"use client"
import React, { useContext, useEffect, useState } from 'react'
import { journalContext } from '../../../context/JournalContext'
import axios from 'axios'
import Button from '../../../UIComponent/Button'
import Image from 'next/image'
import { Laptop, Mic, Pen } from 'lucide-react'
import useSpeechToText from '@/customHooks/useSpeechToText'



const NewJournalEntry = () => {
    const { journals, setJournals, fetchJournals } = useContext(journalContext)
    const { isListening, transcript, startListening, stopListening } = useSpeechToText({ continuous: true })
    const [textInput, setTextInput] = useState("")
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [body, setBody] = useState("")
    const [active, setActive] = useState("type");
    useEffect(() => {
        console.log("Fetching journals");
        fetchJournals();
    }, []);



    const handleAddJournal = async () => {
        const token = localStorage.getItem('token')
        console.log("title, subtitle, body : ", title, " ", subtitle, " ", body)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/weekJournals/create`, {
                title: title,
                subtitle: subtitle,
                body: body
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

            })
            console.log("res: ", res)

            const data = res.data
            setJournals([...journals, data])
        } catch (error) {
            console.log(error.response)
        }
    }
    console.log("journals: ", journals)

    const toggleListening = () => {
        isListening ? stopVoiceInput() : startListening()
    }

    const stopVoiceInput = () => {
        setBody(prev => prev + (transcript.length ? (prev.length ? " " : "") + transcript : ""))
        stopListening()
    }




    return (

        <div className=' flex flex-col overflow-y-auto no-scrollbar m-4 w-full'>
            <div className='flex flex-row gap-2 justify-between items-center p-[5%] '>
                <div className='flex flex-col '>
                    <span className='text-7xl tracking-tighter font-bold font-sans p-2 rounded-2xl  w-fit  bigshot-one-regular  text-[#142517]'>Here You Go.</span>
                    <span className='text-7xl tracking-tighter font-bold font-sans p-2 rounded-2xl  w-fit  bigshot-one-regular  text-[#142517]'>Your own  <span className='text-[#d86d09]'>personal space.</span></span>
                    <span className='text-7xl tracking-tighter font-bold font-sans  p-2 rounded-2xl  w-fit  bigshot-one-regular  text-[#142517]'>Dive in, <span className='text-[#d86d09]'>write </span> your way out.</span>
                </div>
                <div>
                    <Image
                        src="/images/digital_art.jpg"
                        alt="Digital Art"
                        width={200}
                        height={200}
                        className="w-full h-auto rounded-full"
                    />
                </div>
            </div>
            <div className='flex flex-col gap-2 px-5'>
                <span className='font-bold text-2xl my-2 underline'>Decide your writing space</span>
                <div className="flex flex-row gap-2 font-semibold text-lg oregano-regular">
                    {/* Type your words */}

                    <span
                        onClick={() => setActive("type")}
                        className={`flex flex-row gap-2 p-2 rounded-xl cursor-pointer  ${active === "type"
                            ? "bg-[#b75d08]"
                            : "bg-[#dbe0dc] text-black"
                            }`}
                    >
                        <span className='rounded-full p-1 bg-white'>
                            <Laptop />
                        </span>
                        Type your words
                    </span>

                    {/* Canvas Space */}
                    <span
                        onClick={() => setActive("canvas")}
                        className={`flex flex-row gap-2 p-2 rounded-xl cursor-pointer ${active === "canvas"
                            ? "bg-[#b75d08]"
                            : "bg-[#8aad91] text-black"
                            }`}
                    >
                        <span className='rounded-full p-1 bg-white'>
                            <Pen />
                        </span>

                        Write your words - Canvas Space
                    </span>

                    {/* Audio Space */}

                    <span
                        onClick={() => setActive("audio")}
                        className={`flex flex-row gap-2 p-2 rounded-xl cursor-pointer ${active === "audio"
                            ? "bg-[#b75d08] "
                            : "bg-[#8aad91] text-black"
                            }`}
                    >
                        <span className='rounded-full p-1 bg-white'>
                            <Mic />
                        </span>
                        Record your voice - Audio Space


                    </span>

                </div>
                <div className={`flex justify-center items-center   rounded-2xl p-2 w-fit ${isListening ? "bg-red-700" : "bg-green-700 text-white"} `}>
                    {
                        active === "audio" &&
                        <button
                            className={`flex flex-row justify-center items-center gap-2 p-2 rounded-xl cursor-pointer `}
                            onClick={toggleListening}> <span className='rounded-full p-1 '>
                                <Mic />
                            </span>{isListening ? "Stop Speaking..." : "Start Speaking..."}</button>
                    }
                </div>


            </div>

            <div className='flex flex-row gap-4 w-full'>
                <div className=' w-3/4 m-3 flex flex-col bg-[#e0e0e0] min-h-screen p-4 rounded-2xl py-6 text-black gap-4 mt-10 '>
                    <input type="file" className='text-black bg-orange-950/30 w-fit rounded-3xl p-2' />
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder='title'
                        className='p-4 rounded-3xl bg-white w-full my-3' />
                    <input
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        type="text"
                        placeholder='sub-title'
                        className='p-4 rounded-3xl bg-white w-full my-3' />
                    {
                        active === "type" ? <textarea id="body"
                            rows={20}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className='my-3 rounded-2xl bg-white p-4'
                            placeholder='body' style={{
                                width: '100%',
                                height: '100%',
                                resize: 'none'
                            }}></textarea>
                            :
                            active === "canvas" ?
                                <textarea id="body"
                                    rows={20}
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    className='my-3 rounded-2xl bg-white p-4'
                                    placeholder='body' style={{
                                        width: '100%',
                                        height: '100%',
                                        resize: 'none'
                                    }}></textarea>
                                : active === "audio" &&
                                <textarea id="body"
                                    rows={20}
                                    disabled={isListening}
                                    value={isListening ? body + (transcript.length ? (body.length ? " " : "") + transcript : "") : body}
                                    onChange={(e) => setBody(e.target.value)}
                                    className='my-3 rounded-2xl bg-white p-4'
                                    placeholder='body' style={{
                                        width: '100%',
                                        height: '100%',
                                        resize: 'none'
                                    }}></textarea>

                    }

                    <div className='flex flex-row gap-2 '>
                        <Button onclick={handleAddJournal}>Save</Button>
                        <Button>Discard</Button>
                    </div>

                </div>
                <div className='w-1/4'>
                    Photo setion
                </div>
            </div>

        </div>


    )
}

export default NewJournalEntry
