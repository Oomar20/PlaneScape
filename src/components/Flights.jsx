import React from 'react'
import { NavLink } from 'react-router-dom';


const Flights = ({ departureAirport, returnAirport, departureFlights, returnFlights, activeButton, onBookFlight }) => {


    return (
        <>
            {/* Flight Cards Container */}
            <div className="pl-6 rounded-lg" >
                {/* Conditionally Render First Flight Card */}
                {departureFlights.length > 0 ? (
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 relative" >
                        <div className="flex justify-between items-center">
                            {/* Left Section: Departure Details */}
                            <div className="text-left">
                                <h2 className="font-bold">
                                    {departureAirport} - {returnAirport}
                                </h2>
                                <div className="flex items-center space-x-2 mt-2">
                                    <span>✈️</span>
                                    <div>
                                        <p className="text-sm">Departure</p>
                                        <p className="text-2xl font-bold">{departureFlights[0].scheduleTime}</p>
                                        <p className="text-sm">Airport: {departureAirport}</p>
                                    </div>
                                </div>
                                <p className="text-purple-700 font-bold mt-4">Price: $200</p>
                                <p className="text-sm text-gray-500">Round Trip</p>
                            </div>

                            {/* Center Section: Flight Information */}
                            <div className="text-center">
                                <p className="font-medium text-green-600">{departureFlights[0].prefixICAO}</p>
                                <span>✈️</span>
                                <p className="text-sm mt-2">99h 25m (Nonstop)</p>
                            </div>

                            {/* Right Section: Arrival Details */}
                            <div className="text-right">
                                <div className="flex items-center justify-end space-x-2">
                                    <div>
                                        <p className="text-sm">Arrival</p>
                                        <p className="text-2xl font-bold">9:55 AM</p>
                                        <p className="text-sm">Airport: {returnAirport}</p>
                                    </div>
                                    <span>✈️</span>
                                </div>

                                {/* Book Flight Button */}
                                <button
                                    className="absolute bottom-0 right-0 px-10 py-5 bg-purple-700 text-white rounded-lg"
                                    onClick={() => {
                                        if (departureFlights.length > 0) {
                                            const flightData = {
                                                flightNumber: departureFlights[0].flightNumber,
                                                airlines: departureFlights[0].prefixIATA,
                                                departureAirport: departureAirport,
                                                arrivalAirport: returnAirport,
                                                scheduleTime: departureFlights[0].scheduleTime,
                                                estimatedLandingTime: '9:55 AM',
                                            };

                                            onBookFlight(flightData);  // Send flight data to handleBookFlight function
                                        } else {
                                            console.error("No departure flights available");
                                        }
                                    }}
                                >
                                    Book Flight
                                </button>
                            </div>
                        </div>

                        {/* Bottom Section: Additional Links */}
                        <div className="mt-4 text-left">
                            <NavLink to="#" className="text-purple-700 hover:underline">
                                Check the details
                            </NavLink>
                        </div>
                    </div>
                ) : (
                    /* No Departure Flight Found Card */
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 relative text-center">
                        <h2 className="font-bold text-xl">No Departure Flights Found</h2>
                        <p className="text-gray-500 mt-2">Unfortunately, we couldn't find any departure flights matching your search.</p>
                    </div>
                )}

                {/* Conditionally render the second card based on activeButton */}
                {activeButton === 'roundTrip' && (
                    returnFlights && returnFlights.length > 0 ? (
                        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 relative">
                            <div className="flex justify-between items-center">
                                {/* Left Section: Return Flight Details */}
                                <div className="text-left">
                                    <h2 className="font-bold">{returnAirport} - {departureAirport}</h2>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <span>✈️</span>
                                        <div>
                                            <p className="text-sm">Departure</p>
                                            <p className="text-2xl font-bold">{returnFlights[0].scheduleTime}</p>
                                            <p className="text-sm">Airport: {returnAirport}</p>
                                        </div>
                                    </div>
                                    <p className="text-purple-700 font-bold mt-4">Price: $200</p>
                                    <p className="text-sm text-gray-500">Round Trip</p>
                                </div>

                                {/* Center Section: Return Flight Information */}
                                <div className="text-center">
                                    <p className="font-medium text-green-600">{returnFlights[0].prefixICAO}</p>
                                    <span>✈️</span>
                                    <p className="text-sm mt-2">2h 25m (Nonstop)</p>
                                </div>

                                {/* Right Section: Arrival Details */}
                                <div className="text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <div>
                                            <p className="text-sm">Arrival</p>
                                            <p className="text-2xl font-bold">4:55 PM</p>
                                            <p className="text-sm">Airport: {departureAirport}</p>
                                        </div>
                                        <span>✈️</span>
                                    </div>

                                    {/* Book Flight Button */}
                                    <button
                                        className="absolute bottom-0 right-0 px-10 py-5 bg-purple-700 text-white rounded-lg"
                                        onClick={() => {
                                            const flightData = {
                                                flightNumber: returnFlights[0].flightNumber,
                                                airlines: returnFlights[0].prefixIATA,
                                                departureAirport: departureAirport,
                                                arrivalAirport: returnAirport,
                                                scheduleTime: departureFlights[0].scheduleTime,
                                                estimatedLandingTime: '4:55 AM',
                                            };

                                            onBookFlight(flightData);  // Send flight data to handleBookFlight function
                                        }}
                                    >
                                        Book Flight
                                    </button>
                                </div>
                            </div>

                            {/* Bottom Section: Additional Links */}
                            <div className="mt-4 text-left">
                                <NavLink to="#" className="text-purple-700 hover:underline">
                                    Check the details
                                </NavLink>
                            </div>
                        </div>
                    ) : (
                        /* No Return Flight Found Card */
                        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 relative text-center">
                            <h2 className="font-bold text-xl">No Return Flights Found</h2>
                            <p className="text-gray-500 mt-2">Unfortunately, we couldn't find any return flights matching your search.</p>
                        </div>
                    )
                )}
            </div>
        </>
    )
}

export default Flights