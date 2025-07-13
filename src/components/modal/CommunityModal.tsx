import React, { useState } from 'react'

const CommunityModal = () => {
    const [communityName, setCommunityName] = useState()
    const [communityTitle, setCommunityTitle] = useState()
    const [communityDesc, setCommunityDesc] = useState()

    const createCommunity = async () => {
        const token = localStorage.getItem("token")
        const res = await fetch(`${import.meta.env.VITE_URL}/post/createPost`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: communityName,
                title: communityTitle,
                description: communityDesc
            })
        })

        const data = await res.json()
        console.log("data: ", data)
    }
    const handleCreateCommunity = () => {
        createCommunity()
        console.log("create community")
    }
    return (
        <div>
            <input type="text" />
        </div>
    )
}

export default CommunityModal
