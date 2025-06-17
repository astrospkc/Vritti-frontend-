import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ code = 404, message = "Page Not Found. " }) => {
    const navigate = useNavigate();

    const goHome = () => navigate('/');

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4 text-center w-full">
            <h1 className="text-6xl font-bold mb-4 text-red-500">{code}</h1>
            <p className="text-2xl mb-6">{message}</p>
            <p className='text-2xl m-3 text-blue-400'>Check if you are logged in or not</p>
            <button
                onClick={goHome}
                className="bg-white text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
            >
                Go Back Home
            </button>
        </div>
    );
};

export default ErrorPage;
