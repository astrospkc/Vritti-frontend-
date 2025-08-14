"use client";

import React, { useContext, useState, useEffect } from "react";
import { AiFillBackward } from "react-icons/ai";
import Link from "next/link";
import { journalContext } from "../../../../context/JournalContext";
import WeeklyJournalSection from "../../../../components/WeeklyJournalSection";

type ParamsType = {
    params: {
        slug: string[]; // ['2025', 'July', '7']
    };
};

const Journal = ({ params }: ParamsType) => {
    // Convert slug values to usable types
    const [yearStr, monthStr, monthNumberStr] = params.slug;
    const year = Number(yearStr);
    const month = monthStr;
    const monthNumber = Number(monthNumberStr);

    // State for dropdowns
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    // Context data
    const { journals, monthYear, journalObject } = useContext(journalContext);
    console.log("journals, journalObject: ", journals, journalObject)
    // Prevent hydration mismatch by ensuring client-only render
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) {
        return <div className="text-center p-4">Loading journals...</div>;
    }

    // Prepare months and years
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const years = Array.from({ length: 51 }, (_, i) => 2024 + i);

    // Extract weeks safely
    const weeks =
        journalObject && monthYear && journalObject[monthYear]
            ? Object.keys(journalObject[monthYear])
            : [];

    return (
        <div className="overflow-y-auto no-scrollbar m-4 my-10">
            {/* Top bar */}
            <div className="flex flex-row gap-4 justify-center items-center rounded-2xl p-2 bg-violet-200/10 shadow-lg shadow-black">
                {/* Back Button */}
                <div className="text-white">
                    <Link href="/dashboard">
                        <AiFillBackward className="text-orange-900 text-2xl hover:scale-110 hover:text-orange-500 hover:cursor-pointer" />
                    </Link>
                </div>

                {/* Search Input */}
                <div>
                    <label className="text-black font-bold text-xl mx-2">Search</label>
                    <input
                        type="text"
                        className="rounded-2xl bg-gray-700 text-white p-2"
                        placeholder="search with title"
                    />
                </div>

                {/* Month Selector */}
                <div>
                    <label className="text-black font-bold mx-2">Month</label>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="rounded-xl bg-gray-300"
                    >
                        <option value="" disabled>
                            Search with month
                        </option>
                        {months.map((m, index) => (
                            <option value={index + 1} key={index}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Year Selector */}
                <div>
                    <label className="text-black font-bold mx-2">Year</label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="rounded-xl bg-gray-300"
                    >
                        <option value="" disabled>
                            Search with year
                        </option>
                        {years.map((y, index) => (
                            <option value={y} key={index}>
                                {y}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Weekly Journal Sections */}
            {weeks.length > 0 ? (
                weeks.map((week, i) => <WeeklyJournalSection key={i} week={week} />)
            ) : (
                <p className="text-center text-gray-400 mt-8">No journals found for this month.</p>
            )}
        </div>
    );
};

export default Journal;
