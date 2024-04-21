import React from 'react';

const OfflinePage: React.FC = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center px-6">
            <svg
                className="w-16 h-16 mb-4 text-gray-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 1 21 12.79z"></path>
                <path d="M21 12.79l-4.24-4.24M21 12.79l-1.79 1.79M21 12.79l-4.24 4.24M12 8v.01M12 16v.01"></path>
            </svg>
            <h1 className="text-3xl font-semibold mb-2">!Pictify</h1>
            <p className="text-lg mb-4 text-center">Oops! It seems you're offline.</p>
            <p className="text-gray-400 text-center">Please check your internet connection and try again.</p>
        </div>
    );
};

export default OfflinePage;
