import React from 'react'

const MonthlyJournals = () => {
    return (
        <div>
            <div className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-lg hover:shadow-md hover:shadow-orange-500">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 hover:opacity-40 transition duration-300 shadow-xl shadow-black"
                    style={{
                        backgroundImage: `url("/images/glasseffect.jpg")`,

                    }}
                />

                {/* Foreground content */}
                <div className="relative z-10 flex flex-row items-center justify-center w-full h-full p-6 gap-4 hover:cursor-pointer ">
                    <div className="text-8xl text-emerald-600 mb-6 rotate-90 ">
                        MONTH
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-[60%]  ">
                        <div className="bg-black text-white p-4 rounded-xl text-center w-[200px] h-[200px] shadow-md shadow-emerald-700 hover:scale-90">Week 1</div>
                        <div className="bg-black text-white p-4 rounded-xl text-center w-[200px] h-[200px] shadow-md shadow-emerald-700 hover:scale-90">Week 2</div>
                        <div className="bg-black text-white p-4 rounded-xl text-center w-[200px] h-[200px] shadow-md shadow-emerald-700 hover:scale-90">Week 3</div>
                        <div className="bg-black text-white p-4 rounded-xl text-center w-[200px] h-[200px] shadow-md shadow-emerald-700 hover:scale-90">Week 4</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonthlyJournals
