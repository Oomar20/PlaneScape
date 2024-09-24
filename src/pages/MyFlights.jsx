import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import FlightsDetails from '../components/FlightsDetails';
import FlightsFilterBar from '../components/FlightsFilterBar';

const MyFlights = () => {
    const [flights, setFlights] = useState([]);  // State to store fetched flights
    const [loading, setLoading] = useState(true);  // State to handle loading

    // Fetch flight data from the server when the component mounts
    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/flights');  // Fetch flight data from the backend
                const data = await response.json();
                setFlights(data);  // Update state with flight data
                setLoading(false);  // Turn off loading state
            } catch (error) {
                console.error('Error fetching flights:', error);
                setLoading(false);  // Turn off loading state even if there is an error
            }
        };

        fetchFlights();
    }, []);  // Empty dependency array ensures this only runs once on mount

    if (loading) {
        return <div>Loading...</div>;  // Show a loading indicator while data is being fetched
    }

    return (
        <div style={{ backgroundColor: '#f6f4f9' }}>
            <Navbar />
            <FlightsFilterBar />
            <FilterBar />
            {/* Map over the flights array and pass each flight as props to FlightsDetails */}
            {flights.length > 0 ? (
                flights.map((flight) => (
                    <FlightsDetails key={flight._id} flight={flight} />  // Pass flight data as a prop
                ))
            ) : (
                <div>No flights found</div>  // Show a message if no flights are found
            )}
        </div>
    );
};

export default MyFlights;
