import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FlightBooking from '../components/FlightBooking';
import Flights from '../components/Flights';
import FilterSideBar from '../components/FilterSideBar';
import Images from '../components/Images';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { toast } from 'react-toastify';

const MainPage = () => {

    const [showFlightDetails, setShowFlightDetails] = useState(false); // Control flight detail visibility
    const [filteredFlights, setFilteredFlights] = useState({
        departureFlights: [],
        returnFlights: [],
    });
    const [departureAirport, setDepartureAirport] = useState('');
    const [returnAirport, setReturnAirport] = useState('');
    const [activeButton, setActiveButton] = useState('roundTrip');


    const fetchAllFlights = async (scheduleDate) => {
        let page = 1;
        let allFlights = [];
        let hasMoreData = true;
        let retryDelay = 7000;

        while (hasMoreData) {
            const url = `/api/flights?scheduleDate=${scheduleDate}&includedelays=false&page=${page}&sort=%2BscheduleTime`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'app_id': 'c35727af',
                    'app_key': '3494d060e536b0d6cba3eaa215b5d720',
                    'ResourceVersion': 'v4',
                }
            });

            if (response.status === 429) {
                console.warn('Rate limit exceeded, retrying after delay...');
                await new Promise(resolve => setTimeout(resolve, retryDelay));
                retryDelay *= 2;
                continue;
            }

            const data = await response.json();
            allFlights = [...allFlights, ...data.flights];

            if (data.flights.length < 20 || page > 10) { // As the number of the pages fetched increases, the API takes longer time to responde
                hasMoreData = false;
            } else {
                page++;
            }
        }
        return allFlights;
    };

    // Handle show flights when user clicks the "Show Flights" button
    const handleShowFlights = async (departure, arrival, departureDate, returnDate) => {
        const today = new Date();

        // Parse the departureDate and returnDate to Date objects
        const parsedDepartureDate = new Date(departureDate);
        const parsedReturnDate = returnDate ? new Date(returnDate) : null;

        // Check if the selected departure date is in the past
        if (parsedDepartureDate <= today) {
            toast.error('The departure date cannot be in the past.');
            return;  // Exit the function if the departure date is in the past
        }

        // If it's a round trip, check if the return date is in the past
        if (returnDate && parsedReturnDate < today) {
            toast.error('The return date cannot be in the past.');
            return;  // Exit the function if the return date is in the past
        }

        const flights = await fetchAllFlights(departureDate); // Pass departureDate as scheduleDate

        // Filter departure flights
        const departureFlight = flights.filter(
            (flight) =>
                flight.route.destinations.includes(departure) &&
                flight.scheduleDate === departureDate &&
                flight.flightDirection === 'D'
        );

        let returnFlight = null;
        if (activeButton === 'roundTrip') {

            // Fetch flights for the return date
            const returnFlights = await fetchAllFlights(returnDate); // Fetch return flights for return date
            returnFlight = returnFlights.filter(
                (flight) =>
                    flight.route.destinations.includes(arrival) &&
                    flight.scheduleDate === returnDate &&
                    flight.flightDirection === 'A'
            );
        }

        setFilteredFlights({
            departureFlights: departureFlight,
            returnFlights: returnFlight,
        });

        setShowFlightDetails(true); // Show flight details after data is fetched
    };

    // Reset flight details when user switches between "One Way" and "Round Trip"
    const handleButtonChange = (type) => {
        setActiveButton(type);       // Set the trip type (one-way or round-trip)
        setShowFlightDetails(false); // Reset flight details visibility when switching
    };


    const handleBookFlight = async (flightData) => {
        try {

            const response = await fetch('http://localhost:5000/api/bookFlight', {  // Point to your backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(flightData),  // Pass flight data
            });

            if (response.ok) {
                toast.success(`Flight ${flightData.flightNumber} booked successfully!`);
            } else {
                toast.error('There was an issue booking the flight.');
            }
        } catch (error) {
            console.error('Error booking flight:', error);
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
                        {/* Conditionally render Flights component based on showFlightDetails */}
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

                    <div className='row-span-2 col-start-3 '>
                        <FilterSideBar />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default MainPage;
