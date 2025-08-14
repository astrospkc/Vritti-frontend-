"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Button from '../../../../UIComponent/Button'

const ReadJournal = async ({ params, }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    console.log("slug:", slug)
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [body, setBody] = useState("")
    const searchParams = useSearchParams()
    const queryData = searchParams.get("data")
    console.log("query data: ", queryData)

    const [clicked, setClicked] = useState("")
    // console.log("title, subtitle, bosy, date : ", data?.title, " ", data?.subtitle, " ", data?.body, " ", data?.date)
    useEffect(() => {
        setTitle(queryData?.title)
        setSubtitle(queryData?.subtitle)
        setBody(queryData?.body)
    }, [])
    console.log("after useEffect: ", title, subtitle, body)
    const handleClickedButton = (type) => {
        console.log("clicked button: ", clicked)
        if (type == "save") {
            setClicked(type)
        } else if (type == "edit") {
            setClicked(type)
        } else if (type == "discard") {
            setClicked("")
        }
    }

    const [cols, setCols] = useState(1);
    useEffect(() => {
        // Function to handle resizing
        function handleResize() {
            setCols(getColsFromWidth(window.innerWidth));
        }

        // Call initially and on resize
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function getColsFromWidth(width: number) {
        if (width > 1200) return 100; // Large screens
        if (width > 800) return 80;   // Medium screens
        if (width > 600) return 80;   // Small tablets
        return 40;                    // Mobile devices
    }

    useEffect(() => {
        const handleResize = () => {
            setCols(getColsFromWidth(window.innerWidth));
        };
        window.addEventListener('resize', handleResize);
        // Initial setting
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleTitleChange = (e) => {
        console.log(e.target.value)
        setTitle(e.target.value)
    }
    const handleSubtitleChange = (e) => {
        setSubtitle(e.target.value)
    }
    const handleBodyChange = (e) => {
        setBody(e.target.value)
    }
    // console.log("after updating title, subtitle, body: ", title, subtitle, body)
    const handleUpdateJournal = async () => {
        const token = localStorage.getItem("token")
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/weekJournals/updateDayJournal/${data?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    subtitle,
                    body,
                })
            }
            );

            const updatedData = await res.json();
            console.log("Updated journal:", updatedData);
            setTitle(title)
            setSubtitle(subtitle)
            setBody(body)
            setClicked(""); // exit edit mode

        } catch (error) {
            console.error("Error updating journal:", error);
            // You can also add error UI feedback here
        }
    };

    console.log("after updating title, subtitle, body: ", title, subtitle, body)






    return (

        <div className=' overflow-y-auto no-scrollbar m-4'>
            <Link href="/dashboard/monthlypage">
                <Button>Back</Button>
            </Link>
            <div className='flex flex-col justify-center items-center'>
                {/* <div className=' text-5xl text-violet-400 my-2 p-3 rounded-xl shadow-lg shadow-violet-800/60'>
                        Read the journal
                    </div> */}
                <div className='mx-4 shadow-lg shadow-orange-500 p-3 rounded-2xl'>
                    <img src="../images/openbooks.jpg" alt="" height={400} />
                    <div className='flex flex-col w-fit'>
                        {
                            clicked == "edit" ?
                                <>
                                    <input
                                        type="text"
                                        className='text-6xl text-yellow-100 rounded-lg p-2 bg-transparent border-2 border-gray-500 my-2'
                                        value={title.toUpperCase()}

                                        onChange={handleTitleChange}
                                    />
                                    <input
                                        type="text"
                                        className='text-xl text-yellow-50 pb-3 bg-transparent border-2 border-gray-500 my-2 rounded-lg p-2'
                                        value={subtitle}

                                        onChange={handleSubtitleChange}
                                    />
                                    <h1 className='text-lg text-gray-500 py-2'>{data?.date}</h1>
                                    <div className='bg-gray-600 border-t-2 border-gray-500 mb-4'></div>
                                    <textarea
                                        name="" id=""
                                        value={body}

                                        onChange={handleBodyChange}
                                        rows={20}
                                        cols={cols}
                                        className='text-lg text-white py-4 mb-10  rounded-xl p-2 border-2 border-gray-500 bg-transparent'
                                    >{data?.body} </textarea>
                                </>
                                :
                                <>
                                    <h1 className='text-6xl text-yellow-100 '>{data?.title.toUpperCase()}</h1>
                                    <h2 className='text-xl text-yellow-50 pb-3'>{data?.subtitle}</h2>
                                    <h1 className='text-lg text-gray-500 py-2'>{data?.date}</h1>
                                    <div className='bg-gray-600 border-t-2 border-gray-500 mb-4'></div>
                                    <div className=' text-lg text-white py-4 mb-10  rounded-xl'>
                                        {data?.body}
                                    </div>
                                </>
                        }
                    </div>
                </div>
                <div className='justify-start flex flex-row gap-4 mt-5'>
                    {
                        clicked === "" ? (
                            <Button onclick={() => handleClickedButton("edit")}>EDIT</Button>
                        ) : clicked === "edit" ? (
                            <>
                                <Button onclick={() => handleClickedButton("discard")}>DISCARD</Button>
                                <Button onclick={handleUpdateJournal}>SAVE</Button>
                            </>
                        ) : null
                    }
                    <Link href="/dashboard/monthlypage">
                        <Button>DONE READ</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ReadJournal
