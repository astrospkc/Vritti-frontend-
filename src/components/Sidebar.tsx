import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { BsArrowRightCircleFill } from "react-icons/bs";
import { BsArrowLeftCircleFill } from "react-icons/bs";

const Sidebar = () => {

    const { openSidebar, setOpenSidebar, isAuthenticated, setIsAuthenticated } = useContext(UserContext)

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(prev => !prev)
    }
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },

        { name: 'CommunityPage', path: '/community' },
        { name: 'Journals', path: '/journals' },
        { name: 'New Journal Entry', path: '/new-journals' },
        { name: 'Analytics', path: '/analytics' },
        { name: 'User Settings', path: '/settings' },
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
                !openSidebar ? <div className='bg-violet-950/20  text-yellow-50 h-fit p-6 '>
                    <div className="text-2xl font-bold mb-8 font-serif text-violet-300  ">VRiTTi</div>

                    <BsArrowRightCircleFill
                        onClick={handleOpenSidebar}
                        className='hover:cursor-pointer text-2xl' /></div>
                    :
                    <div className="w-[20%] min-h-screen bg-violet-950/20 text-white p-6 z-10  shadow-md shadow-orange-500 ">

                        <div className="text-2xl font-bold mb-8 font-serif text-violet-300  ">VRiTTi</div>
                        <BsArrowLeftCircleFill
                            onClick={handleOpenSidebar}
                            className='hover:cursor-pointer text-2xl' />
                        <nav className="flex flex-col gap-4">
                            {
                                navItems && navItems.map((item, i) => (
                                    <Link
                                        key={i}
                                        to={`${item.path}`}
                                        className={`px-3 py-2  hover:bg-gradient-to-b hover:from-violet-500 hover:to-black  hover:shadow-sm hover:shadow-orange-500 transition  ${i < 6 ? 'rounded-xl' : 'hover:rounded-xl border-t-2 border-gray-600 text-gray-400 hover:text-orange-500'}`}
                                    >
                                        {item.name}
                                    </Link>
                                ))
                            }

                            <h1
                                className="px-3 py-2  bg-gradient-to-b from-violet-500 to-black shadow-sm shadow-orange-500 transition  rounded-xl hover:rounded-xl border-t-2 border-gray-600 text-white cursor-pointer hover:text-orange-500">
                                Logout
                            </h1>s

                        </nav>

                    </div>
            }

        </>

    );
};

export default Sidebar;
