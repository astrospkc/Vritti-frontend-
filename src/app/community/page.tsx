"use client"
import React, { useContext, useEffect, useState } from 'react'
import TopicCards from '../../components/TopicCards'
import { Bookmark, BookmarkCheck, Image } from 'lucide-react'
import { PostInteractionContext } from '../../context/PostInteractionProvider'
import Link from 'next/link'
// import { useQuery } from '@tanstack/react-query'




const Community = () => {
    const [imageOpen, setImageOpen] = useState(false)
    const { bookmark_arr, setBookmark_arr } = useContext(PostInteractionContext)
    const [postWithNullCommunityId, setPostWithNullCommunityId] = useState<any[]>([])
    const [bookmarked, setBookmarked] = useState(false)
    const [token, setToken] = useState<string>("")
    useEffect(() => {
        const t = localStorage.getItem("token")
        setToken(t ? t : "")
    })

    const fetchPostWithNullCommunityId = async () => {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/fetchPostByCommmunityId`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await res.json()
        console.log("data")
        setPostWithNullCommunityId([...postWithNullCommunityId, ...data])
    }
    useEffect(() => {
        fetchPostWithNullCommunityId()
    }, [])

    const handleClickImage = () => {
        setImageOpen(prev => !prev)
    }


    const handleLike = async (targetId, targetType) => {
        const token = localStorage.getItem("token")
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vote/upVote${targetType}/${targetId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }


    const handleAddBookmark = async (id: string) => {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookmark/createBookmark?postId=${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        setBookmarked(prev => !prev)
        setBookmark_arr([...bookmark_arr, data])
    }

    const handleRemoveBookmark = async (id: string) => {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookmark/removeBookmark?postId=${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        // const data = await res.json()
        setBookmarked(prev => !prev)
        setBookmark_arr(prev => prev.filter((post) => post.postId != id))
        // setBookmark_arr([...bookmark_arr, data])
    }

    return (
        <div className='flex flex-row w-full h-full'>
            {/* left bar */}
            <div className='flex flex-col gap-4 w-[30%] justify-center h-full m-auto items-center my-10   '>


                <div className='flex  flex-col bg-amber-50 p-10 rounded-3xl shadow-lg shadow-[#E0E0E0]'>
                    <span className='font-sans text-black font-bold mb-4 rounded-2xl shadow-sm shadow-[#c6c5c5] p-2'>CHANNEL</span>
                    <ul className='flex flex-col gap-4 text-black p-4'>

                    </ul>
                </div>
                <div className='flex  flex-col bg-amber-50 p-10 rounded-3xl shadow-lg shadow-[#E0E0E0]'>
                    <span className=' cursor-pointer hover:scale-90 hover:bg-[#F6C08E] font-sans text-black font-bold mb-4 rounded-2xl shadow-sm shadow-[#c6c5c5] p-2 transition-colors duration-500 ease-out'>Create Post</span>
                    <span className=' cursor-pointer hover:scale-90 hover:bg-[#F6C08E] font-sans text-black font-bold mb-4 rounded-2xl shadow-sm shadow-[#c6c5c5] p-2 transition-colors duration-500 ease-out'>Create Community</span>

                </div>



            </div>



            {/* main content */}
            <div className='w-full flex flex-col '>
                <div className='my-10'>
                    <span className='text-black text-5xl font-bold my-4'>Community Forum</span>
                    <p className='text-gray-500 '>Connect with the other journals, share your experience and find inspiration</p>
                </div>
                {/* search bar */}
                <input type="text" className='w-3/4 text-black' placeholder='Search post using title or genre' />
                {/* Featured Discussions - would be recommended using the users mood track , we analyse the mood and according to that the featured discusion would be presented */}
                <div className='w-full shadow-lg shadow-gray-400/30 p-8 my-2 rounded-b-2xl'>
                    <div
                        className='text-2xl p-2 w-fit my-4 shadow-lg shadow-gray-500/50 rounded-2xl text-black font-bold bg-gray-400/30'
                    >Featured Discussions</div>
                    <TopicCards />
                </div>
                {/* Recent post */}
                <div className='my-10 flex flex-col'>
                    <span
                        className='text-2xl w-fit p-2 shadow-lg shadow-gray-500/50 rounded-2xl text-black font-bold bg-gray-400/30'
                    >Recent Posts</span>
                    <div className='mt-4'>
                        <ul className='flex flex-row gap-4'>
                            <li
                                className='bg-gray-500/10 p-3 rounded-2xl text-black font-semibold shadow-lg shadow-gray-500/30'
                            >All Topics</li>
                            <li
                                className='bg-gray-500/10 p-3 rounded-2xl text-black font-semibold shadow-lg shadow-gray-500/30'
                            >Personal Growth</li>
                            <li
                                className='bg-gray-500/10 p-3 rounded-2xl text-black font-semibold shadow-lg shadow-gray-500/30'
                            >Mindfulness</li>
                            <li
                                className='bg-gray-500/10 p-3 rounded-2xl text-black font-semibold shadow-lg shadow-gray-500/30'
                            >Creatve Writing</li>
                        </ul>
                    </div>
                    {/* post content */}
                    <div className=''>
                        <div className=" flex flex-col mt-4 bg-orange-100   p-4 rounded-xl mr-4 shadow-lg shadow-gray-300">
                            <input
                                type="text"
                                placeholder='share the post'
                                className='bg-black shadow-md shadow-gray-400/30 p-4 w-1/2 rounded-xl border-2 border-gray-800' />

                            <Image onClick={handleClickImage} className='cursor-pointer hover:text-orange-600 text-black hover:scale-75 my-2 ' />
                            {
                                imageOpen &&
                                <input type='file' />
                            }

                            <div className="mt-4 bg-[#8dbaa8] hover:bg-white shadow-lg shadow-gray-400 hover:shadow-[#8dbaa8] hover:cursor-pointer text-black font-semibold px-4 py-2 rounded text-sm w-fit transition-colors duration-500 ease-out">
                                Share This Post
                            </div>
                        </div>
                        <div>

                            {
                                // isPending ? <div>Loading ....</div>
                                //     : error ? <div>An error has occurred .. ${error.message}</div>
                                //         :
                                postWithNullCommunityId && postWithNullCommunityId.map((post, idx) => {
                                    // console.log("post: ", post)
                                    // console.log()
                                    let formattedDate = "0"
                                    if (post?.createdAt) {
                                        const dateobj = new Date(post?.createdAt)
                                        const d = dateobj.getUTCDate()
                                        const month = dateobj.getUTCMonth() + 1
                                        const year = dateobj.getUTCFullYear()
                                        const getHour = dateobj.getUTCHours()
                                        const getMinute = dateobj.getUTCMinutes()
                                        formattedDate = `${getHour}:${getMinute}  ${d}-${month}-${year}`

                                    }

                                    return (
                                        <div key={idx} className=" shadow-lg shadow-black bg-[#2A2A3C] p-4 rounded-xl my-4">
                                            <div className='flex flex-col border-b-2 border-gray-800 pb-2'>
                                                <h3 className="font-semibold text-md mb-1">{post?.anonymousName}</h3>
                                                <h3 className='text-gray-500 font-semibold text-xs'>{formattedDate}</h3>
                                            </div>

                                            <p className="text-sm text-gray-300 mb-2 mt-4">
                                                {post?.body}
                                            </p>
                                            {/* <div className="flex space-x-2 mb-2">
                                                        <div className="bg-gray-500 w-20 h-20 rounded-lg">{ }</div>
                                                        <div className="bg-gray-500 w-20 h-20 rounded-lg"></div>
                                                        <div className="bg-gray-500 w-20 h-20 rounded-lg"></div>
                                                    </div> */}
                                            <div className="flex space-x-4 text-sm text-gray-300">
                                                <span className='cursor-pointer' onClick={() => handleLike(post._id, "posts")}>❤ {post?.voteScore}</span>
                                                <span className='cursor-pointer'>💬 { }</span>
                                                {
                                                    bookmarked ?
                                                        <span
                                                            onClick={() => handleRemoveBookmark(post._id)}
                                                            className='cursor-pointer'><BookmarkCheck />
                                                        </span>
                                                        :
                                                        <span
                                                            onClick={() => handleAddBookmark(post._id)}
                                                            className='cursor-pointer'><Bookmark />
                                                        </span>
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Community
