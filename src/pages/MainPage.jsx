import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import FlightBooking from '../components/FlightBooking';
import Flights from '../components/Flights';
import FilterSideBar from '../components/FilterSideBar';
import Images from '../components/Images';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import airports from '/airports.json';

const MainPage = () => {
    const [showFlightDetails, setShowFlightDetails] = useState(false);
    const [filteredFlights, setFilteredFlights] = useState({
        departureFlights: [],
        returnFlights: [],
    });
    const [departureAirport, setDepartureAirport] = useState('');
    const [returnAirport, setReturnAirport] = useState('');
    const [activeButton, setActiveButton] = useState('roundTrip');
    const [iataCode, setIATACode] = useState("");

    // Function for fetching the flights from Schiphol Airport's API using user's credentials
    const fetchFlights = async (iataCodes, flightDirection, scheduleDate) => {
        for (const iataCode of iataCodes) {
            try {
                const url = `/api/schiphol-flights/flights?scheduleDate=${scheduleDate}&flightDirection=${flightDirection}&route=${iataCode}&includedelays=true&page=0&sort=%2BscheduleTime`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'app_id': 'c35727af',
                        'app_key': '3494d060e536b0d6cba3eaa215b5d720',
                        'ResourceVersion': 'v4',
                    },
                });

                if (response.status === 429) {
                    console.warn('Rate limit exceeded, retrying...');
                    await new Promise(resolve => setTimeout(resolve, 7000));
                    continue;
                }

                const data = await response.json();

                if (data.flights && data.flights.length > 0) {
                    return data.flights;
                } else {
                    console.log(`No flights found for IATA code: ${iataCode}`);
                }
            } catch (error) {
                console.error(`Error fetching flights for IATA code: ${iataCode}`, error);
            }
        }

        console.warn("No flights found for any IATA codes.");
        return [];
    };

    const getIATACode = (input) => {
        const airport = Object.values(airports).find(
            (a) =>
                a.name.toLowerCase().includes(input.toLowerCase()) ||
                a.city.toLowerCase().includes(input.toLowerCase())
        );
        return airport ? airport.iata : null;
    };

    // Handling the display of flights
    const handleShowFlights = async (departureArray, arrivalArray, departureDate, returnDate) => {
        const filteredDepartureArray = departureArray.filter((airport) => airport.iata);
        const filteredArrivalArray = arrivalArray.filter((airport) => airport.iata);

        const departureIATACodes = filteredDepartureArray.map((airport) => airport.iata);
        const arrivalIATACodes = filteredArrivalArray.map((airport) => airport.iata);

        // Calling the the API for the departure flight
        const departureFlights = await fetchFlights(departureIATACodes, 'D', departureDate);

        let returnFlights = [];
        if (activeButton === 'roundTrip') {
            // Calling the API for the retrun flight
            returnFlights = await fetchFlights(arrivalIATACodes, 'A', returnDate);
        }

        if (departureFlights.length === 0 && returnFlights.length === 0) {
            toast.warn("No flights found for the selected routes.");
        }

        setFilteredFlights({
            departureFlights,
            returnFlights,
        });
        setShowFlightDetails(true);
    };

    // Function for changing the trip from 'round trip' to 'one way'
    const handleButtonChange = (type) => {
        setActiveButton(type);
        setShowFlightDetails(false);
    };

    // Funtion for handling the submit button by saving the booked flights to the database
    const handleBookFlight = async (flightData) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.warn('You must be logged in to book a flight.');
                return;
            }

            const response = await fetch('http://localhost:5000/api/bookFlight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(flightData),
            });

            if (response.ok) {
                toast.success(`Flight ${flightData.flightNumber} booked successfully!`);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'There was an issue booking the flight.');
            }
        } catch (error) {
            toast.error('Failed to book the flight due to a network error.');
        }
    };



    return (
        <>
            <div className="min-h-screen" style={{ backgroundColor: '#f6f4f9' }}>
                <Navbar />

                <div className='grid grid-cols-4 grid-rows-[min-content,2fr,2fr] gap-4 max-h-screen'>
                    <div className='col-span-3 row-span-1 h-52 w-full'>
                        <FlightBooking
                            setIATACode={setIATACode}
                            getIATACode={getIATACode}
                            handleShowFlights={handleShowFlights}
                            setDepartureAirport={setDepartureAirport}
                            setReturnAirport={setReturnAirport}
                            activeButton={activeButton}
                            setActiveButton={handleButtonChange}
                        />
                    </div>

                    <div className='col-span-1 row-span-2'>
                        <Images />
                    </div>

                    <div className='col-span-2 row-span-2'>
                        {showFlightDetails && (
                            <Flights
                                departureAirport={departureAirport}
                                returnAirport={returnAirport}
                                departureFlights={filteredFlights.departureFlights}
                                returnFlights={filteredFlights.returnFlights}
                                activeButton={activeButton}
                                onBookFlight={handleBookFlight}
                            />
                        )}
                    </div>

                    <div className='row-span-2 col-start-3'>
                        <FilterSideBar />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default MainPage;
