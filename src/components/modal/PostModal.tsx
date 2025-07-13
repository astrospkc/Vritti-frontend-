import React from 'react'

const PostModal = () => {
    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
                <p className="text-gray-700">This is the modal content.</p>
            </div>
        </div>
    )
}

export default PostModal
