"use client"
import React, { useContext, useEffect, useState } from 'react'
import TopicCards from '../../components/TopicCards'
import { Bookmark, BookmarkCheck, HeartMinus, HeartPlus, Image } from 'lucide-react'
import { usePostStore, useBookmarkStore } from '@/store/store'
import { UserContext } from '@/context/UserContext'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { useQuery } from '@tanstack/react-query'




const Community = () => {
    const { fetchAllPosts, createPost } = usePostStore()
    const { fetchAllBookmarks, bookmarkPost, unbookmarkPost, bookmarks } = useBookmarkStore()

    return (
        <>
            <div className="flex flex-col w-full h-full">
                <HeroContent
                    createPost={createPost}
                />
                <div className='flex flex-row w-full h-full'>

                    <PostContent
                        bookmarkPost={bookmarkPost}
                        unbookmarkPost={unbookmarkPost}
                        fetchAllPosts={fetchAllPosts}
                    />
                    <SavedPosts
                        bookmarkPost={bookmarkPost}
                        unbookmarkPost={unbookmarkPost}
                        bookmarks={bookmarks}
                        fetchAllBookmarks={fetchAllBookmarks}
                    />
                </div>


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


                    <div className='flex  flex-col bg-amber-50 p-10 rounded-3xl  shadow-md shadow-[#76614e]/20'>
                        <span className='font-sans text-black font-bold mb-4 rounded-2xl shadow-sm shadow-[#917255] p-2'>CHANNEL</span>
                        <ul className='flex flex-col gap-4 text-black p-4'>

                        </ul>
                    </div>
                    <div className='flex  flex-col bg-amber-50 p-10 rounded-3xl shadow-md shadow-[#76614e]/20'>
                        {/* on clicking this , a modal would open to create a post */}
                        <span
                            onClick={() => setShowModal(true)}
                            // disabled={mutation.isPending}
                            className=' cursor-pointer hover:scale-90 hover:bg-[#F6C08E] font-sans text-black font-bold mb-4 rounded-2xl shadow-sm shadow-[#917255]  p-2 transition-colors duration-500 ease-out'> {mutation.isPending ? "Creating..." : "Create Post"}</span>
                        <span className=' cursor-pointer hover:scale-90 hover:bg-[#F6C08E] font-sans text-black font-bold mb-4 rounded-2xl shadow-sm shadow-[#917255]  p-2 transition-colors duration-500 ease-out'>Create Community</span>
                        {/* {mutation.isError && <p className="text-red-500">Error: {mutation.error.message}</p>} */}

                    </div>
                    {/* Modal */}
                    {showModal && (
                        <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-40 z-50">
                            <div className="bg-gradient-to-b from-[#F6C08E] to-white w-[90%] md:w-[500px] rounded-2xl text-black p-6 shadow-lg relative">
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
                    <input type="text" className='w-3/4 text-black shadow-sm shadow-[#917255]/30 ' placeholder='Search post using title or genre' />
                    {/* Featured Discussions - would be recommended using the users mood track , we analyse the mood and according to that the featured discusion would be presented */}
                    <div className='w-full shadow-lg shadow-gray-400/30 p-8 my-2 rounded-b-2xl'>
                        <div
                            className='text-2xl p-2 w-fit my-4 shadow-md shadow-[#917255]/30  rounded-2xl text-black font-bold bg-gray-400/30'
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

function PostContent({ fetchAllPosts, bookmarkPost, unbookmarkPost }: { fetchAllPosts: any, bookmarkPost: any, unbookmarkPost: any }) {
    const [imageOpen, setImageOpen] = useState(false)
    const [postWithNullCommunityId, setPostWithNullCommunityId] = useState<any[]>([])
    const [bookmarked, setBookmarked] = useState(false)
    const [postLikes, setPostLikes] = useState({ target_id: "", likes: 0 })
    const { user } = useContext(UserContext)
    const handleClickImage = () => {
        setImageOpen(prev => !prev)
    }
    const queryClient = useQueryClient()

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

    const likeClick = async (targetId: string, targetType: string) => {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/like/userLike/${targetType}/${targetId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const dataLike = await res.json()
        console.log("data like: ", dataLike)
        return dataLike

    }
    const dislikeClick = async (targetId: string, targetType: string) => {
        const token = localStorage.getItem("token")
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/like/userDislike/${targetType}/${targetId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    const handleClick = async (targetId: string, targetType: string, type: string) => {
        if (type == "like") {

            const islikeData = await likeClick(targetId, targetType)
            console.log("islikeData: ", islikeData)

        } else if (type == "dislike") {
            const disliked = await dislikeClick(targetId, targetType)
            console.log(disliked)

            // setIsLiked(likeData.success)
        }
    }

    // get all the bookmarked post
    const bookmarkMutation = useMutation({
        mutationFn: bookmarkPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        }
    })
    const unbookmarkMutation = useMutation({
        mutationFn: unbookmarkPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        }
    })
    const handleAddBookmark = async (id: string) => {
        bookmarkMutation.mutate(id)

    }

    const handleRemoveBookmark = async (id: string) => {
        unbookmarkMutation.mutate(id)

    }


    return (
        <>

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
                            let ifMatchesPostId = false
                            if (post._id == postLikes.target_id) {
                                ifMatchesPostId = true
                            }
                            console.log(post.isLikedByLoggedInUser, "is liked or not")

                            return (
                                <div key={idx} className=" shadow-lg shadow-black bg-[#2A2A3C] p-4 rounded-xl my-4">
                                    {/* post header */}
                                    <div className='flex flex-row items-center gap-2'>
                                        <div className='w-10 h-10  bg-gray-400 rounded-full'>

                                        </div>
                                        <div className='flex flex-col border-b-2 border-gray-800 pb-2'>
                                            <h3 className="font-semibold text-md mb-1">{post.createdBy?.anonymousName}</h3>
                                            <h3 className='text-gray-500 font-semibold text-xs'>{formattedDate}</h3>
                                        </div>
                                    </div>

                                    <div className='rounded-xl my-5 bg-slate-600/40 p-4'>
                                        <div className=" text-lg font-bold md:text-lg text-gray-300 ">
                                            {post?.title}
                                        </div>
                                        <p>
                                            {post?.body.length > 100 ? post?.body.slice(0, 100) + "..." : post?.body}
                                        </p>
                                    </div>


                                    <div className="flex space-x-4 text-sm text-gray-300">
                                        {
                                            post?.isLikedByLoggedInUser == 1 || post?.isLikedByLoggedInUser ?

                                                <span className='cursor-pointer flex flex-row items-center text-red-600   ' onClick={() => handleClick(post._id, "posts", "dislike")}><HeartMinus /> {
                                                    ifMatchesPostId ? postLikes.likes : post?.likes}</span>
                                                :
                                                <span className='cursor-pointer flex flex-row items-center  ' onClick={() => handleClick(post._id, "posts", "like")}><HeartPlus /> {
                                                    ifMatchesPostId ? postLikes.likes : post?.likes}</span>

                                        }


                                        <span className='cursor-pointer'>💬 { }</span>
                                        {
                                            post.isBookmarked ?
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

function SavedPosts({ bookmarkPost, unbookmarkPost, fetchAllBookmarks }: { bookmarkPost: any, unbookmarkPost: any, bookmarks: any, fetchAllBookmarks: any }) {
    const [allSavedPosts, setAllSavedPosts] = useState([])
    const { data, isLoading, error } = useQuery({
        queryKey: ["bookmarks"],
        queryFn: fetchAllBookmarks
    })
    useEffect(() => {
        setAllSavedPosts(data)
    }, [data])
    console.log("bookmarks: ", allSavedPosts)
    if (isLoading) {
        console.log("data is loading")
    }
    if (error) {
        console.log("some error has occurred while fetching bookmarks")
    }
    return (
        <>
            <div className='w-1/2 bg-black'>
                <div>Saved Posts</div>

            </div>

        </>
    )

}
