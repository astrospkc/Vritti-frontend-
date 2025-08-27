"use client"
import React, { useContext, useEffect, useState } from 'react'
import TopicCards from '../../components/TopicCards'
import { Bookmark, BookmarkCheck, HeartMinus, HeartPlus, Image, Target } from 'lucide-react'
import { PostInteractionContext } from '../../context/PostInteractionProvider'
import Link from 'next/link'
import { createPostponedAbortSignal } from 'next/dist/server/app-render/dynamic-rendering'
import usePostStore from '@/store/store'
import { UserContext } from '@/context/UserContext'
import { StatementSync } from 'node:sqlite'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { m } from 'framer-motion'
// import { useQuery } from '@tanstack/react-query'




const Community = () => {
    const { posts, fetchAllPosts, updatePost, deletePost, createPost } = usePostStore()

    return (
        <>
            <div className="flex flex-col w-full h-full">
                <HeroContent
                    createPost={createPost}
                />

                <PostContent
                    fetchAllPosts={fetchAllPosts}
                />

            </div>



        </>

    )
}

export default Community

function HeroContent({ createPost }: { createPost: any }) {

    const [token, setToken] = useState<string>("")
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        imageUrl: "",
        communityId: ""
    })

    const queryClient = useQueryClient()


    useEffect(() => {
        const t = localStorage.getItem("token")
        setToken(t ? t : "")
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        }
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        mutation.mutate(formData)
        // console.log("posts : ", posts)
        setShowModal(false)
        setFormData({
            title: "",
            body: "",
            imageUrl: "",
            communityId: ""
        })
    }
    return (
        <>
            <div className='flex flex-row w-full h-full'>
                {/* left bar */}
                <div className='flex flex-col gap-4 w-[30%] justify-center h-full m-auto items-center my-10   '>


                    <div className='flex  flex-col bg-amber-50 p-10 rounded-3xl shadow-lg shadow-[#E0E0E0]'>
                        <span className='font-sans text-black font-bold mb-4 rounded-2xl shadow-sm shadow-[#c6c5c5] p-2'>CHANNEL</span>
                        <ul className='flex flex-col gap-4 text-black p-4'>

                        </ul>
                    </div>
                    <div className='flex  flex-col bg-amber-50 p-10 rounded-3xl shadow-lg shadow-[#E0E0E0]'>
                        {/* on clicking this , a modal would open to create a post */}
                        <span
                            onClick={() => setShowModal(true)}
                            // disabled={mutation.isPending}
                            className=' cursor-pointer hover:scale-90 hover:bg-[#F6C08E] font-sans text-black font-bold mb-4 rounded-2xl shadow-sm shadow-[#c6c5c5] p-2 transition-colors duration-500 ease-out'> {mutation.isPending ? "Creating..." : "Create Post"}</span>
                        <span className=' cursor-pointer hover:scale-90 hover:bg-[#F6C08E] font-sans text-black font-bold mb-4 rounded-2xl shadow-sm shadow-[#c6c5c5] p-2 transition-colors duration-500 ease-out'>Create Community</span>
                        {/* {mutation.isError && <p className="text-red-500">Error: {mutation.error.message}</p>} */}

                    </div>
                    {/* Modal */}
                    {showModal && (
                        <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-40 z-50">
                            <div className="bg-white w-[90%] md:w-[500px] rounded-2xl text-black p-6 shadow-lg relative">
                                {/* Close button */}
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                                >
                                    ✕
                                </button>

                                <h2 className="text-xl font-bold mb-4">Create New Post</h2>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="border rounded-lg p-2"
                                        required
                                    />

                                    <textarea
                                        name="body"
                                        placeholder="Write your thoughts..."
                                        value={formData.body}
                                        onChange={handleChange}
                                        className="border rounded-lg p-2 h-24"
                                        required
                                    />

                                    <input
                                        type="url"
                                        name="imageUrl"
                                        placeholder="Image URL (optional)"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        className="border rounded-lg p-2"
                                    />

                                    <input
                                        type="text"
                                        name="communityId"
                                        placeholder="Community ID (optional)"
                                        value={formData.communityId}
                                        onChange={handleChange}
                                        className="border rounded-lg p-2"
                                    />

                                    <button
                                        type="submit"
                                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-lg"
                                    >
                                        Post
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
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

                    </div>
                </div>
            </div>
        </>
    )
}

function PostContent({ fetchAllPosts }: { fetchAllPosts: any }) {
    const [imageOpen, setImageOpen] = useState(false)
    const [postWithNullCommunityId, setPostWithNullCommunityId] = useState<any[]>([])
    const { bookmark_arr, setBookmark_arr } = useContext(PostInteractionContext)
    const [like, setLike] = useState(false)
    const [votersList, setVotersList] = useState<any[]>([])
    const [bookmarked, setBookmarked] = useState(false)
    const { user } = useContext(UserContext)
    const handleClickImage = () => {
        setImageOpen(prev => !prev)
    }

    console.log("user in community page: ", user)
    const { data, isLoading, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchAllPosts
    })

    if (isLoading) {
        console.log("data is loading")
    }
    if (error) {
        console.log("some error occurred while fetching posts")
    }
    useEffect(() => {
        setPostWithNullCommunityId(data)

    }, [data])

    console.log("voters list: ", votersList)
    console.log("post with null community id: ", postWithNullCommunityId)

    // useEffect(() => {
    //     if (votersList && votersList.length > 0 || votersList && votersList.includes(localStorage.getItem("userId"))) {
    //         console.log("user id is present in voter list or not: ", votersList.includes(localStorage.getItem("userId")))
    //         setLike(true)
    //     } else {
    //         console.log("hey there")
    //         setLike(false)
    //     }

    // }, [votersList])

    const likeClick = async (targetId: string, targetType: string) => {
        const token = localStorage.getItem("token")
        const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vote/upVote/${targetType}/${targetId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        console.log("data: ", data)
    }
    const dislikeClick = async (targetId: string, targetType: string) => {
        const token = localStorage.getItem("token")
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vote/downVote/${targetType}/${targetId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    const handleClick = async (targetId: string, targetType: string, type: string) => {
        console.log("like button")
        if (type == "like") {
            await likeClick(targetId, targetType)
        } else if (type == "dislike") {
            await dislikeClick(targetId, targetType)
        }

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
        <>
            {/* post content */}
            <div className=' mx-[5%] w-3/4 flex flex-col justify-center items-center'>
                <div className=" flex flex-col mt-4 bg-orange-100   p-4 rounded-xl mr-4 shadow-lg shadow-gray-300 ">
                    <input
                        type="text"
                        placeholder='share the post'
                        className='bg-black shadow-md shadow-gray-400/30 p-4 w-full rounded-xl border-2 border-gray-800' />

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
                            let voter_list = post?.voters
                            console.log("voter list: ", voter_list)
                            let voteLike = false
                            if (voter_list.length > 0 && voter_list.includes(localStorage.getItem("userId"))) {
                                console.log("user id is present in voter list or not: ", voter_list.includes(localStorage.getItem("userId")))
                                // setLike(true)
                                voteLike = true
                            } else {
                                console.log("hey there")
                                // setLike(false)
                                voteLike = false
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
                                    {/*  */}
                                    <div className="flex space-x-4 text-sm text-gray-300">
                                        {
                                            voteLike ?
                                                <span className='cursor-pointer flex flex-row items-center' onClick={() => handleClick(post._id, "posts", "dislike")}><HeartMinus /> {post?.voteScore}</span>
                                                :
                                                <span className='cursor-pointer flex flex-row items-center' onClick={() => handleClick(post._id, "posts", "like")}><HeartPlus /> {post?.voteScore}</span>

                                        }


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
        </>
    )
}
