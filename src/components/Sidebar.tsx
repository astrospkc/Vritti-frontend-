import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ currentPage }) => {
    const isCommunityPage = currentPage === 'community';

    const navItems = [
        { name: 'Home', path: '/' },
        { name: isCommunityPage ? 'Dashboard' : 'Community', path: '/community' },
        { name: 'Journals', path: '/journals' },
        { name: 'New Journal Entry', path: '/new-journal' },
        { name: 'Analytics', path: '/analytics' },
        { name: 'User Settings', path: '/settings' },
        { name: 'API', path: '/api' },
        { name: 'Usage', path: '/usage' },
        { name: 'Billing', path: '/billing' },
    ];

    return (
        <aside className="w-[20%] min-h-screen bg-violet-950/20 text-white p-6 shadow-lg  ">
            <div className="text-2xl font-bold mb-8 font-serif text-violet-300  ">VRiTTi</div>
            <nav className="flex flex-col gap-4">

                <Link to={"/"}

                    className="px-3 py-2 rounded hover:bg-violet-700/40 transition"
                >
                    Home
                </Link>
                <Link to={"/community"}

                    className="px-3 py-2 rounded hover:bg-violet-700/40 transition"
                >
                    Community
                </Link>
                <Link to={"/journals"}

                    className="px-3 py-2 rounded hover:bg-violet-700/40 transition"
                >
                    Journals
                </Link>
                <Link to={"/analytics"}

                    className="px-3 py-2 rounded hover:bg-violet-700/40 transition"
                >
                    Analytics
                </Link>
                <Link to={"/new-journals"}

                    className="px-3 py-2 rounded hover:bg-violet-700/40 transition bg-violet-400/50"
                >
                    New Journal Entry
                </Link>
                <div className='border-2 border-violet-700/40'></div>
                <Link to={"/api"}

                    className="px-3 py-2 rounded hover:bg-violet-700/40 transition"
                >
                    API
                </Link>
                <Link to={"/settings"}

                    className="px-3 py-2 rounded hover:bg-violet-700/40 transition"
                >
                    User settings
                </Link>
                <Link to={"/usage"}

                    className="px-3 py-2 rounded hover:bg-violet-700/40 transition"
                >
                    Usage
                </Link>
                <Link to={"/billing"}

                    className="px-3 py-2 rounded hover:bg-violet-700/40 transition"
                >
                    Billing
                </Link>


            </nav>
        </aside>
    );
};

export default Sidebar;
