"use client"
import React from 'react';

const Button = ({ children, onclick }: any) => {


    return (
        <div
            onClick={onclick}
            className='text-md text-yellow-100 my-2 p-2 bg-gradient-to-l bg-black shadow-md shadow-black rounded-lg w-fit  hover:cursor-pointer hover:shadow-lg hover:shadow-yellow-300 hover:scale-95'>
            {children}
        </div>

    );
};

export default Button;

{/* <button
    className="px-4 py-2 relative overflow-hidden border-2 border-transparent rounded-3xl hover:bg-blue-400 transition-colors duration-300"
    onClick={onclick}
>
    <span className="relative z-10 text-white">{children}</span>
    <div className="absolute inset-0 border-2 border-blue-500 border-r-yellow-500 rounded-3xl"></div>
</button> */}