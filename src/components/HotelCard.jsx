import React, { useEffect, useState } from 'react';
import stringSimilarity from 'string-similarity';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HotelCard = ({ hotel, searchParams }) => {
    const [fetchedAmenities, setFetchedAmenities] = useState([]);


    // Fetching the amenities logs from amenities.js
    useEffect(() => {
        const fetchAmenities = async () => {
            try {
                const response = await fetch('/api/amenities');
                const data = await response.json();
                setFetchedAmenities(data);
            } catch (error) {
                console.error('Error fetching amenities:', error);
            }
        };

        fetchAmenities();
    }, []);

    const handleBooking = async () => {

        // Checking for the user token in localStorage
        const token = localStorage.getItem('token');

        if (!token) {
            // Displaying a warning toast if the user is not logged in
            toast.warn('You should be logged in to book a hotel!');
            return;
        }

        // Extracting the user ID from token 
        const userId = JSON.parse(atob(token.split('.')[1])).userId;

        // Preparing the data to send to the backend
        const bookingData = {
            userId,
            city: searchParams.city,
            name: hotel.name,
            checkInTime: hotel.check_in_time,
            checkOutTime: hotel.check_out_time,
            checkIn: searchParams.checkIn,
            checkOut: searchParams.checkOut,
            adults: searchParams.adults,
            children: searchParams.children,
            amenities: hotel.amenities,
            price: hotel.rate_per_night?.lowest,
            photo: hotel.images?.[0]?.thumbnail,
        };

        try {
            const response = await fetch('/api/bookHotels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Pass the token for authentication
                },
                body: JSON.stringify(bookingData), // Convert booking data to JSON
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(`Hotel booked successfully`);
            } else {
                const error = await response.json();
                toast.error(`Booking failed: ${error.message}`);
            }
        } catch (error) {
            console.error('Error booking hotel:', error);
            toast.error('An error occurred while booking the hotel.');
        }
    };



    return (
        <>
            <div className="flex flex-col space-y-6">
                <div
                    className="mt-12 mr-16 ml-16 h-60 flex justify-between p-6 rounded-lg shadow-md"
                    style={{ backgroundColor: '#F6F4F9' }}
                >
                    <img
                        src={hotel.images?.[0]?.thumbnail || "/assets/hotels_image.jpg"}
                        alt={hotel.name || "Hotel"}
                        className="w-72 h-48 rounded-lg object-cover"
                    />

                    {/* Wrapper for Hotel Details */}
                    <div className="w-96">
                        <div className="h-48 tracking-wide pl-4 pt-1 flex flex-col space-y-4">
                            <div className="text-3xl">{hotel.name}</div>
                            <div className="text-xl">{hotel.description}</div>
                        </div>
                    </div>

                    <div className="w-1/2 mt-7 h-auto text-lg flex justify-start pl-16">
                        {hotel.amenities?.length > 0 ? (
                            <div className="grid grid-cols-4 gap-4 w-full">
                                {hotel.amenities.map((amenity, index) => {
                                    let matchingAmenity = fetchedAmenities.find((item) => {
                                        let similarity = stringSimilarity.compareTwoStrings(
                                            item.name.toLowerCase(),
                                            amenity.toLowerCase()
                                        );
                                        return similarity > 0.6;
                                    });

                                    // If no match by name, try matching by ID
                                    if (!matchingAmenity) {
                                        matchingAmenity = fetchedAmenities.find((item) => {
                                            let similarity = stringSimilarity.compareTwoStrings(
                                                item.id.toLowerCase(),
                                                amenity.toLowerCase()
                                            );
                                            return similarity > 0.6;
                                        });
                                    }

                                    return (
                                        <div className="flex items-center space-x-2" key={index}>
                                            <img
                                                src={
                                                    matchingAmenity
                                                        ? `/assets/SVGs/${matchingAmenity.icon}`
                                                        : '/assets/SVGs/default-icon.svg'
                                                }
                                                className="w-5 h-5"
                                            />
                                            <span className="whitespace-nowrap">
                                                {matchingAmenity ? matchingAmenity.name : amenity}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div>No amenities available</div>
                        )}
                    </div>



                    {/* Price and Button */}
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-purple-600">{hotel.rate_per_night?.lowest || 'N/A'}</span>
                        <button
                            className="bg-purple-600 text-white mt-4 py-2 px-6 rounded-lg hover:bg-purple-700 transition"
                            onClick={handleBooking}
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default HotelCard;


