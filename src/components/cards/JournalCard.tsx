
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


const JournalCard = ({ id, title, subtitle, body, date }) => {
    // const dataToPass = {
    //     id: id,
    //     title: title,
    //     subtitle: subtitle,
    //     body: body,
    //     date: date
    // }
    // console.log("data to pass: ", dataToPass)
    let short_title;
    let short_subtitle;

    if (title.length > 20) {
        short_title = title.slice(0, 20) + "..."
    } else {
        short_title = title
    }

    if (subtitle.length > 20) {
        short_subtitle = subtitle.slice(0, 20) + "..."
    } else {
        short_subtitle = subtitle
    }

    // console.log("short_title and subtitle: ", short_title, short_subtitle)
    return (
        //   picture, title , subtitle, date
        <Link
            href={{
                pathname: `readJournal/${id}`,
                // convert object to string
            }}
        >
            <div
                className="relative w-full max-w-md h-64 rounded-2xl overflow-hidden  transform transition duration-500 hover:scale-105 group animate-fade-in shadow-lg shadow-[#3d3d3d] hover:cursor-pointer p-4"
            >
                {/* Background Image with Zoom on Hover */}

                <Image
                    src="/images/forest.jpg"
                    alt="card background"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={800}
                    height={200}
                    priority

                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-500 group-hover:bg-black/60 " />

                {/* Content */}
                <div className="absolute bottom-0 p-6 text-white z-10 transition-all duration-500 ">
                    <h2 className="text-2xl font-bold mb-4">{short_title.toUpperCase()}</h2>
                    <p className="text-sm text-gray-200 border-b-2 pb-2">{short_subtitle}</p>
                    <span className="text-xs text-gray-300">{date}</span>
                </div>
            </div>
        </Link>

    )
}

export default JournalCard
