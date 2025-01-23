import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { toast } from 'react-toastify';


const FlightsDetails = (flights) => {

    const [airline, setAirline] = useState('');
    const [flightTime, setFlightTime] = useState('');


    useEffect(() => {
        // Fetching the airlines logos the airlinesLogos.json file
        fetch('./airlinesLogos.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch airline logos');
                }
                return response.json();
            })
            .then((jsonData) => {
                // Accessing the data array from the JSON file
                const airlineData = jsonData.data;

                // Finding the airline logo by name or code
                const airline = airlineData.find(
                    (airline) =>
                        airline.icao_code === flights.flight.icao_code
                );
                setAirline(airline);


            })
            .catch((error) => console.error('Error fetching airline logos:', error));
    }, [flights.airlineCode, flights.airlineName]);

    const calculateFlightTime = (scheduleTime, estimatedLandingTime) => {
        // Ensuring the time strings are in a format that JavaScript can parse
        const todayDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

        // Converting the times into a 24-hour format
        const formattedScheduleTime = `${todayDate}T${convertTo24HourFormat(scheduleTime)}`;
        const formattedArrivalTime = `${todayDate}T${convertTo24HourFormat(estimatedLandingTime)}`;

        // Converting to Date objects
        const departure = new Date(formattedScheduleTime); // Use scheduleTime for departure
        const arrival = new Date(formattedArrivalTime); // Use estimatedLandingTime for arrival

        // Checking if the dates are valid
        if (isNaN(departure.getTime()) || isNaN(arrival.getTime())) {
            console.error('Invalid date format');
            return '';
        }

        let timeDiff = arrival - departure; // in milliseconds

        // If arrival time is earlier than departure time (e.g., crossing midnight), assume next day arrival
        if (timeDiff < 0) {
            timeDiff += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
        }

        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours}h ${minutes}m`;
    };

    const convertTo24HourFormat = (time) => {
        // Check if time contains AM/PM; if not, it's in 24-hour format
        const is12HourFormat = time.includes('AM') || time.includes('PM');
        if (!is12HourFormat) {
            // If it's already in 24-hour format, return as is
            return time; // assuming the format is HH:mm:ss or HH:mm
        }

        // Ensure there's a space before AM/PM if it's missing
        if (time.match(/\d{1,2}(:\d{2})?[A-Za-z]{2}$/)) {
            time = time.replace(/([0-9]{1,2}:[0-9]{2})([APM]+)$/i, '$1 $2');
        }

        const [hours, minutesAndPeriod] = time.split(':');
        const [minutes, period] = minutesAndPeriod.split(' ');

        let hoursIn24Format = parseInt(hours, 10);
        if (period.toUpperCase() === 'PM' && hoursIn24Format !== 12) {
            hoursIn24Format += 12;
        } else if (period.toUpperCase() === 'AM' && hoursIn24Format === 12) {
            hoursIn24Format = 0;
        }

        return `${hoursIn24Format.toString().padStart(2, '0')}:${minutes}`;
    };

    // Update flight time whenever scheduleTime or estimatedLandingTime changes
    useEffect(() => {
        if (flights.flight.scheduleTime && flights.flight.estimatedLandingTime) {

            const time = calculateFlightTime(flights.flight.scheduleTime, flights.flight.estimatedLandingTime);
            setFlightTime(time);

        } else {
            console.log('Invalid times provided:', flights.flight.scheduleTime, flights.flight.estimatedLandingTime);
        }
    }, [flights.flight.scheduleTime, flights.flight.estimatedLandingTime]);

    // Functino for deleting flights from the database
    const handleDeleteFlight = async () => {
        const token = localStorage.getItem('token');  // Get the token from localStorage

        if (!token) {
            toast.error('You must be logged in to delete the flight');
            return;
        }

        try {
            const response = await fetch(`/api/flights/${flights.flight._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,  // Include token in the Authorization header
                },
            });

            if (!response.ok) {
                toast.error('Failed to delete the flight');
                return;
            }

            const result = await response.json();
            toast.success('Flight deleted successfully!');

        } catch (error) {
            console.error('Error deleting flight:', error);
            toast.error('Failed to delete the flight. Please try again.');
        }
    };


    // A helpoer function to capitalize the first letter of the name of the city
    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    return (
        <>
            <div className='flex flex-col items-center h-full gap-4 mt-10  mr-10 ml-10'>
                <div className="">
                    <div className='bg-white rounded-lg w-full flex-1 flex p-10'>
                        <div className='flex justify-self-start self-strech bg-white rounded-lg w-36 h-full '>
                            <div className='rounded-full ml-10 mt-4 w-20 h-32'>
                                <img src={airline.logo} alt="" className='object-contain w-24 h-full rounded-full' />
                            </div>
                        </div>
                        <div className='flex flex-col  w-80'>
                            <div className='flex bg-white rounded-lg mt-3 pl-3 h-16'>
                                <div className='content-center text-3xl'>{flights.flight.scheduleTime.slice(0, -3)} AM - {flights.flight.estimatedLandingTime} </div>
                            </div>
                            <div className='bg-white rounded-lg text-lg font-bold mt-2 pl-3 w-36 h-12'> {airline.name}</div>
                            <div className='bg-white rounded-lg text-sky-500 text-lg mt-2 pl-3 w-36 h-8 '>Flight Details</div>
                        </div>
                        <div className='flex flex-col  mt-20 gap-2'>
                            <div className='bg-white rounded-lg content-center font-bold pl-3 w-32 h-8'>Nonstop</div>
                            <div className='bg-white rounded-lg text-gray-400 content-center pl-3 w-32 h-8'>{flightTime}</div>
                        </div>
                        <div className='flex flex-col mt-20 gap-2'>
                            <div className='bg-white rounded-lg content-center font-bold pl-3 w-32 h-10'>
                                {capitalizeFirstLetter(flights.flight.departureAirport)} to {capitalizeFirstLetter(flights.flight.arrivalAirport)}
                            </div>
                            <div className='bg-white rounded-lg text-gray-400 content-center pl-3 w-32 h-8'>
                                Flight number {flights.flight.flightNumber}
                            </div>
                        </div>
                        <div className='flex flex-row justify-around gap-5 ml-32 mt-3'>
                            <div className='flex flex-col justify-around bg-white border border-gray-300 shadow-sm rounded-lg w-32 h-36'>
                                <div className='flex items-center justify-center text-center bg-white rounded-lg text-3xl font-bold w-full h-16'>$156</div>
                                <div className='flex items-center justify-center text-center bg-white text-gray-400 rounded-lg w-full h-8'>Main</div>
                            </div>
                            <div className='flex flex-col justify-around bg-white border border-gray-300 shadow-sm rounded-lg w-32 h-36'>
                                <div className='flex items-center justify-center text-center bg-white rounded-lg text-3xl font-bold w-full h-16'>$204</div>
                                <div className='flex items-center justify-center text-center bg-white text-gray-400 rounded-lg w-full h-8'>Comfort+</div>
                            </div>
                            <div className='flex flex-col justify-around bg-gray-300  rounded-lg w-32 h-36'></div>
                            <div className='flex flex-col justify-around bg-white rounded-lg border border-gray-300 shadow-sm w-32 h-36'>
                                <div className='flex items-center justify-center text-center bg-white rounded-lg text-3xl font-bold w-full h-16'>$386</div>
                                <div className='flex items-center justify-center text-center bg-white text-gray-400 rounded-lg w-full h-8'>Delta One</div>
                            </div>
                            <div className='flex flex-col justify-around bg-gray-300 rounded-lg w-32 h-36'></div>
                            <button
                                className='flex flex-col justify-around mt-10 bg-red-500 border border-gray-300 shadow-sm rounded-lg w-32 h-16'
                                onClick={handleDeleteFlight}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default FlightsDetails
