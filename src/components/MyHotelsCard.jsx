import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { toast } from 'react-toastify';


const MyHotelsCard = () => {
    const [hotels, setHotels] = useState([]);  // State to store fetched hotels
    const [loading, setLoading] = useState(true); // State to show loading
    const [error, setError] = useState(null); // State to handle errors

    // Fetching hotels from the API when the component mounts
    useEffect(() => {
        const fetchBookedHotels = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                if (!token) {
                    // setError('You must be logged in to view your booked hotels.');
                    toast.error('You must be logged in to view your booked hotels.')
                    setLoading(false);
                    return;
                }

                const response = await fetch('/api/bookedHotels', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Sending token for authentication
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch booked hotels: ${response.status}`);
                }

                const data = await response.json();
                setHotels(data); // Set the fetched hotels in state
            } catch (err) {
                toast.error('Error fetching booked hotels.')
                setError(err.message);
            } finally {
                setLoading(false); // Hiding loading indicator
            }
        };

        fetchBookedHotels();
    }, []);

    // Handle scroll behavior
    useEffect(() => {
        // Disable scrolling when there are no booked hotels
        if (hotels.length === 0) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            document.body.style.overflow = ''; // Enable scrolling
        }

        // Cleanup to reset overflow when the component unmounts or hotels change
        return () => {
            document.body.style.overflow = '';
        };
    }, [hotels]); // Re-run when hotels array changes

    const handleRemoveHotel = async (index) => {
        try {
            const hotelToRemove = hotels[index];
            const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

            if (!hotelToRemove || !hotelToRemove._id) {
                throw new Error('Invalid hotel ID');
            }

            const response = await fetch(`/api/bookedHotels/${hotelToRemove._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Sending the token for authentication
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to remove hotel: ${response.status}`);
            }

            // Remove the hotel from the frontend state
            setHotels((prevHotels) => prevHotels.filter((_, i) => i !== index));
            toast.success('Hotel removed succesfully');
        } catch (err) {
            toast.error('Error removing hotel:')
        }
    };

    // Function to capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    return (
        <>
            <div className="p-6">
                {loading && <p>Loading your booked hotels...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {/* If no hotels and no errors */}
                {!loading && !error && hotels.length === 0 && (
                    <div className="flex justify-center items-center min-h-screen">
                        <div className="border border-gray-300 mb-64 p-6 rounded-lg w-full max-w-md text-center">
                            <h2 className="text-2xl font-bold">No booked hotels found</h2>
                        </div>
                    </div>
                )}

                {/* If there are hotels */}
                {!loading && !error && hotels.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hotels.map((hotel, index) => (
                            <div key={index} className="p-4 border rounded-lg shadow-md">
                                <img
                                    src={hotel.photo || '/assets/hotel-placeholder.jpg'}
                                    alt={hotel.name}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <h3 className="text-xl font-bold mt-2">{hotel.name}</h3>
                                <div className="flex flex-row">
                                    <div>
                                        <p className="text-gray-600">City: {capitalizeFirstLetter(hotel.city)}</p>
                                        <p className="text-gray-600">Check-in: {hotel.checkIn}</p>
                                        <p className="text-gray-600">Check-out: {hotel.checkOut}</p>
                                        <p className="text-gray-600">Adults: {hotel.adults}, Children {hotel.children}</p>
                                        <p className="text-purple-600 font-bold mt-2">Price: {hotel.price}</p>
                                    </div>
                                    <div className="pl-10">
                                        <p className="text-gray-600">Check-in Time: {hotel.checkInTime}</p>
                                        <p className="text-gray-600">Check-out Time: {hotel.checkOutTime}</p>
                                    </div>
                                </div>
                                <button
                                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                    onClick={() => handleRemoveHotel(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default MyHotelsCard;
