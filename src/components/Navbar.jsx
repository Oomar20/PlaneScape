import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    // Chekcing if the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    // Function to decode a JWT using `atob`
    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1]; // Get the payload part of the token
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = atob(base64);
            return JSON.parse(jsonPayload); // Convert the decoded payload to JSON
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    };


    useEffect(() => {

        // Function to check the token validity
        const checkToken = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = parseJwt(token);

                if (decodedToken) {
                    const currentTime = Date.now() / 1000; // Current time in seconds

                    if (decodedToken.exp < currentTime) {
                        // Token is expired
                        localStorage.removeItem('token'); // Remove expired token
                        setIsLoggedIn(false);
                        navigate('/login'); // Redirect to login page
                    } else {
                        // Token is valid
                        setIsLoggedIn(true);
                    }
                } else {
                    // Invalid token
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false); // No token found
            }
        };

        checkToken();

        // Periodically checking the token validity
        const interval = setInterval(checkToken, 5 * 60 * 1000); // Every 5 minutes
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [navigate]);

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        setIsLoggedIn(false);
        navigate('/login'); // Redirect to the login page
    };

    return (
        <nav className="border-b text-xl" style={{ backgroundColor: '#f6f4f9', borderColor: '#f6f4f9' }}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                        {/* Logo */}
                        <NavLink to="/" className="flex flex-shrink-0 items-center mr-4">
                            <span className="hidden md:block text-black text-2xl font-bold ml-2">
                                Plane Scape
                            </span>
                        </NavLink>
                        <div className="md:ml-auto">
                            <div className="flex space-x-7">
                                <NavLink to="/home">Flight Booking</NavLink>
                                <NavLink to="/hotels">Hotel Booking</NavLink>
                                {isLoggedIn && (
                                    <>
                                        <NavLink to="/myflights">Booked Flights</NavLink>
                                        <NavLink to="/myhotels">Booked Hotels</NavLink>
                                    </>
                                )}
                                <NavLink to="/contactus">Contact Us</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 ml-10 rounded hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="bg-blue-500 text-white px-4 py-2 ml-10 rounded hover:bg-blue-600 transition"
                                >
                                    Sign In
                                </NavLink>
                                <NavLink
                                    to="/signup"
                                    className="bg-green-500 text-white px-4 py-2 ml-2 rounded hover:bg-green-600 transition"
                                >
                                    Create Account
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

