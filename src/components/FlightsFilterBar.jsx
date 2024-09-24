import React from 'react'

const FlightsFilterBar = () => {
    return (
        <div className="flex justify-between items-center bg-white p-8 pl-32 pr-32 shadow-md rounded-md">
            {/* Filter Buttons */}
            <div className="flex space-x-4 text-xl">
                <button className="border px-4 py-2 rounded-md bg-white hover:bg-gray-100">
                    Times
                </button>
                <button className="border px-4 py-2 rounded-md  bg-white hover:bg-gray-100">
                    Stops
                </button>
                <button className="border px-4 py-2 rounded-md  bg-white hover:bg-gray-100">
                    Airlines
                </button>
                <button className="border px-4 py-2 rounded-md  bg-white hover:bg-gray-100">
                    Airports
                </button>
                <button className="border px-4 py-2 rounded-md bg-white hover:bg-gray-100">
                    Amenities
                </button>
                <button className="text-blue-500 px-4 py-2  hover:underline">
                    Edit Search
                </button>
            </div>

            {/* Star Ratings */}
            <div className="flex space-x-5 text-xl">
                <div className="flex items-center">
                    <span className="text-gray-400">&#9733;</span>
                    <span className="text-gray-400">&#9733;</span>
                    <span className="text-gray-400">&#9733;</span>
                </div>
                <div className="flex items-center">
                    <span className="text-gray-400">&#9733;</span>
                    <span className="text-gray-400">&#9733;</span>
                    <span className="text-black">&#9733;</span>
                </div>
                <div className="flex items-center">
                    <span className="text-gray-400">&#9733;</span>
                    <span className="text-black">&#9733;</span>
                    <span className="text-black">&#9733;</span>
                </div>
                <div className="flex items-center">
                    <span className="text-black">&#9733;</span>
                    <span className="text-black">&#9733;</span>
                    <span className="text-black">&#9733;</span>
                </div>
            </div>
        </div>
    )
}

export default FlightsFilterBar