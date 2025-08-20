"use client"
import Sidebar from "../../components/Sidebar"

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="relative flex flex-col w-full h-screen bg-gradient-to-b from-[#f0d7c0] to-transparent">
            {/* Background SVG covering top half */}
            <div
                style={{
                    backgroundImage: "url('/images/WaveLine.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.2
                }}
                className="absolute top-0 left-0 w-full h-1/2 -z-10"
            ></div>

            {/* Content */}
            <div className="flex flex-col w-full">
                {/* Header */}
                <div className="flex flex-row w-full justify-between items-center my-10 px-10">
                    <div className="h-[2px] bg-black w-1/2"></div>
                    <div className="text-3xl md:text-6xl knewave-regular text-[#0e3b29]">
                        VRiTTi
                    </div>
                    <div className="h-[2px] bg-black w-1/2"></div>
                </div>

                {/* Body */}
                <div className="flex flex-row w-full">

                    <Sidebar />


                    <div className="h-full  w-full overflow-auto">{children}</div>
                </div>
            </div>
        </div>

    )
}