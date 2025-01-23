import React, { useState } from 'react';

const HotelSearchBar = ({ onSearch }) => {

    // Getting the credentials from the user
    const [city, setCity] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const handleSearch = () => {
        const searchParams = { city, checkIn, checkOut, adults, children };
        onSearch(searchParams);
    };

    return (
        <div className="flex items-center justify-between gap-4 p-4 rounded-lg shadow-md" style={{ backgroundColor: '#F6F4F9' }}>
            <div>
                <span className='mr-3'>City</span>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border border-gray-300 rounded-full p-2 w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div>
                <span className='mr-3'>Check In</span>
                <input
                    type="date"
                    placeholder="Check In"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="border border-gray-300 rounded-full p-2 w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div>
                <span className='mr-3'>Check Out</span>
                <input
                    type="date"
                    placeholder="Check Out"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="border border-gray-300 rounded-full p-2 w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div>
                <span className='mr-3'>Adults</span>
                <input
                    type="number"
                    placeholder="Adults"
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    className="border border-gray-300 rounded-full p-2 w-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div>
                <span className='mr-3'>Children</span>
                <input
                    type="number"
                    placeholder="Children"
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    className="border border-gray-300 rounded-full p-2 w-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <button
                onClick={handleSearch}
                className="bg-purple-600 text-white py-2 px-6 w-32 rounded-full hover:bg-purple-700 transition"
            >
                Search
            </button>
        </div>
    );
};

export default HotelSearchBar;
