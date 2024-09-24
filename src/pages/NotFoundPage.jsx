import React from "react";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-purple-700 mb-4">404</h1>
                <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
                <NavLink to='/home' className="px-8 py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition duration-300">
                    Go back to Homepage
                </NavLink>
            </div>
        </div>
    );
};

export default NotFoundPage;
