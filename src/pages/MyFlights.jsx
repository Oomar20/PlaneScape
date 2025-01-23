import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import FlightsDetails from '../components/FlightsDetails';
import FlightsFilterBar from '../components/FlightsFilterBar';
import { toast } from 'react-toastify';

const MyFlights = () => {
    const [flights, setFlights] = useState([]);  // State to store fetched flights
    const [loading, setLoading] = useState(true);  // State to handle loading

    // Fetching flight data from the database
    useEffect(() => {
        const fetchFlights = async () => {
            const token = localStorage.getItem('token');  // Get the token from localStorage

            try {
                const response = await fetch('http://localhost:5000/api/flights', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,  // Add the token in the request headers
                    },
                });

                if (!response.ok) {
                    toast.error('Failed to fetch flights.');
                }

                const data = await response.json();
                setFlights(data);  // Updating state with flight data
                setLoading(false);  // Turning off loading state

            } catch (error) {
                console.error('Error fetching flights:', error);
                setLoading(false);  // Turning off loading state even if there is an error
            }
        };

        fetchFlights();
    }, []);

    // Disable scrolling when there are no booked flights
    useEffect(() => {
        if (flights.length === 0) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            document.body.style.overflow = ''; // Enable scrolling
        }

        // Cleanup function to reset overflow when the component is unmounted or flights change
        return () => {
            document.body.style.overflow = '';
        };
    }, [flights]); // Re-run the effect when the `flights` array changes

    if (loading) {
        return <div>Loading...</div>;  // Showing a loading indicator while data is being fetched
    }

    return (
        <div style={{ backgroundColor: '#f6f4f9' }}>
            <Navbar />
            <FlightsFilterBar />
            <FilterBar />
            {/* Maping over the flights array and passing each flight as props to FlightsDetails */}
            {flights.length > 0 ? (
                flights.map((flight) => (
                    <FlightsDetails key={flight._id} flight={flight} />  // Passing flight data as a prop
                ))
            ) : (
                // If no flight data is available, display this message
                <div className="flex justify-center items-center min-h-screen">
                    <div className="border border-gray-300 mb-64 p-6 rounded-lg w-full max-w-md text-center">
                        <h2 className="text-2xl font-bold">No booked flights were found</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyFlights;
