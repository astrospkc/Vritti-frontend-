import React from 'react'

const JournalCard = ({ title, subtitle, date }) => {
    return (
        //   picture, title , subtitle, date
        <div
            className="relative w-full max-w-md h-64 rounded-2xl overflow-hidden shadow-xl transform transition duration-500 hover:scale-105 group animate-fade-in"
        >
            {/* Background Image with Zoom on Hover */}
            <img
                src="../images/forest.jpg"
                alt="card background"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-500 group-hover:bg-black/60" />

            {/* Content */}
            <div className="absolute bottom-0 p-6 text-white z-10 transition-all duration-500">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-sm text-gray-200">{subtitle}</p>
                <span className="text-xs text-gray-300">{date}</span>
            </div>
        </div>
    )
}

export default JournalCard
