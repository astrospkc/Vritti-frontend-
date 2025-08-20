import React, { useContext } from 'react';

import { UserContext } from '../context/UserContext';
import { BsArrowRightCircleFill } from "react-icons/bs";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Sidebar = () => {

    const { openSidebar, setOpenSidebar, isAuthenticated, setIsAuthenticated } = useContext(UserContext)
    const router = useRouter()
    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(prev => !prev)
        router.push("/")
    }
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },

        { name: 'CommunityPage', path: '/community' },
        { name: 'Journals', path: '/dashboard/journals' },
        { name: 'New Journal Entry', path: '/dashboard/newJournalEntry' },
        { name: 'Analytics', path: '/dashboard/analytics' },
        { name: 'User Settings', path: '/dashboard/settings' },
        { name: 'API', path: '/api' },
        { name: 'Usage', path: '/usage' },
        { name: 'Billing', path: '/billing' },

    ];

    const handleOpenSidebar = () => {
        setOpenSidebar(prev => !prev)

    }

    return (
        <>
            {
                !openSidebar ? <div className=' fixed top-0 flex flex-row gap-2 bg-transparent text-yellow-50 h-fit p-6 overflow-hidden '>
                    <BsArrowRightCircleFill
                        onClick={handleOpenSidebar}
                        className='hover:cursor-pointer text-orange-900 text-2xl' />
                    {/* <span className='font-bold text-orange-900 text-2xl knewave-regular'>
                        VRiTTi
                    </span> */}


                </div>
                    :
                    <div className="w-[20%]   text-white p-6 z-10 my-4 rounded-3xl shadow-lg  shadow-gray-500 mx-4">

                        <div className='flex flex-row gap-2 '>
                            <BsArrowLeftCircleFill
                                onClick={handleOpenSidebar}
                                className='hover:cursor-pointer text-2xl text-orange-900' />
                            {/* <span className='font-bold text-orange-900 text-2xl knewave-regular'>
                                VRiTTi
                            </span> */}

                        </div>

                        <nav className="flex flex-col gap-4">
                            {
                                navItems && navItems.map((item, i) => (
                                    <Link
                                        key={i}
                                        href={`${item.path}`}
                                    >
                                        <ul>
                                            <li
                                                className={`px-3 py-2  hover:bg-[#F6C08E] hover:shadow-sm hover:shadow-orange-500 font-semibold hover:text-orange-900 transition  ${i < 6 ? 'text-[#c86f20] rounded-xl ' : 'hover:rounded-xl border-t-2 border-gray-600 text-gray-500'}`}

                                            >
                                                {item.name}

                                            </li>
                                        </ul>

                                    </Link>
                                ))
                            }

                            <h1
                                onClick={handleLogout}
                                className="px-3 py-2 bg-[#F6C08E] shadow-sm shadow-orange-500 transition  rounded-xl hover:rounded-xl border-t-2 border-gray-600 text-orange-900 font-bold cursor-pointer hover:text-orange-500">
                                Logout
                            </h1>

                        </nav>

                    </div>
            }

        </>

    );
};

export default Sidebar;
