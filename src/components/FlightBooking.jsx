import React, { useState } from 'react';
import airports from '/airports.json';


const FlightBooking = ({ handleShowFlights, setDepartureAirport, setReturnAirport, activeButton, setActiveButton, setIATACode }) => {
    // State variables for storing user input
    const [departureAirport, setDeparture] = useState('');
    const [returnAirport, setArrival] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    // Function to handle changing the trip type
    const handleButtonChange = (type) => {
        if (type === 'oneWay') {
            // Reset the return date when switching to one-way trip
            setReturnDate('');
        }
        setActiveButton(type);
    };

    // Function for creating a list of all valid airports
    const handleSearchFlights = () => {
        const departureAirports = getIATAListForCity(departureAirport);
        const returnAirports = getIATAListForCity(returnAirport);
        handleShowFlights(departureAirports, returnAirports, departureDate, returnDate);
    };


    // Getting the IATA code for the aiport
    const getIATAListForCity = (input) => {
        if (!input || !airports) {
            console.error("Invalid input or airports data is undefined.");
            return [];
        }

        const searchInput = input.toLowerCase().trim();

        // Filtering all matching airports
        const matchedAirports = Object.values(airports).filter((a) => {
            const cityMatch = a.city && a.city.toLowerCase().includes(searchInput);
            return cityMatch && a.iata; // Ensure the airport has an IATA code
        });

        if (matchedAirports.length > 0) {
            return matchedAirports.map((airport) => ({
                name: airport.name || "Unknown Name",
                iata: airport.iata, // Only include valid IATA codes
            }));
        } else {
            console.warn(`No airports found for city: "${input}"`);
            return [];
        }
    };


    return (
        <>
            <div className="max-h-32 pr-16 text-xl">
                <div className="p-6 bg-white rounded-xl shadow-lg ml-6 rounded-md">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl">✈️</span>
                            <h1 className="text-lg font-bold">BOOK YOUR FLIGHT</h1>
                        </div>
                        <div className="flex items-center bg-gray-100 rounded-full">
                            <button
                                onClick={() => handleButtonChange('roundTrip')}
                                className={`px-4 py-2 text-sm font-medium focus:outline-none rounded-l-full ${activeButton === 'roundTrip' ? 'text-white bg-purple-700' : 'text-gray-700 bg-gray-200'
                                    }`}
                            >
                                Round trip
                            </button>
                            <button
                                onClick={() => handleButtonChange('oneWay')}
                                className={`px-4 py-2 text-sm font-medium focus:outline-none rounded-r-full ${activeButton === 'oneWay' ? 'text-white bg-purple-700' : 'text-gray-700 bg-gray-200'
                                    }`}
                            >
                                One way
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4">
                        {/* Departure input */}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-700">✈️</span>


                            <input
                                type="text"
                                placeholder="Departure"
                                className="w-full pl-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-700"
                                value={departureAirport}
                                onChange={(e) => {
                                    const trimmedValue = e.target.value.trim();
                                    setDeparture(trimmedValue); // Update the local state for user input
                                    setDepartureAirport(trimmedValue); // Update the parent state

                                    const iataCodeList = getIATAListForCity(trimmedValue); // Get matching IATA codes
                                    // console.log("IATA Code(s):", iataCodeList);

                                    setIATACode(iataCodeList); // Pass the IATA code(s) to the parent
                                }}
                            />
                        </div>

                        {/* Arrival input */}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-700">✈️</span>

                            <input
                                type="text"
                                placeholder="Arrival"
                                className="w-full pl-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-700"
                                value={returnAirport}
                                onChange={(e) => {
                                    const trimmedValue = e.target.value.trim();
                                    setArrival(trimmedValue);
                                    setReturnAirport(trimmedValue);
                                    const iataCodeList = getIATAListForCity(trimmedValue);
                                    // setReturnAirport(iataCode || trimmedValue); // Set IATA code if found, fallback to input
                                    setIATACode(iataCodeList);
                                }}

                            />


                        </div>

                        {/* Departure date input */}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-700">📅</span>
                            <input
                                type="date"
                                className="w-full pl-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-700"
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)} // Update state with input
                            />
                        </div>

                        {/* Return date input (only visible if round trip is selected) */}
                        <div className={`relative ${activeButton === 'oneWay' ? 'hidden' : ''}`}>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-700">📅</span>
                            <input
                                type="date"
                                className="w-full pl-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-700"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)} // Update state with input
                            />
                        </div>
                    </div>

                    <button
                        className="px-6 py-2 text-white bg-purple-700 rounded-full"
                        onClick={handleSearchFlights} // Trigger flight search when clicked
                    >
                        Show flights
                    </button>
                </div>


            </div>
        </>
    );
};

export default FlightBooking;
