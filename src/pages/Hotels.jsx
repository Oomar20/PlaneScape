import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HotelSearchBar from '../components/HotelSearchBar';
import HotelCard from '../components/HotelCard';
import { toast, ToastContainer } from 'react-toastify';

const Hotels = () => {


    const [hotels, setHotels] = useState([]);
    const [searchParams, setSearchParams] = useState({});


    // Function for fetching the hotels from Serp API
    const fetchHotels = async (fetchParams) => {
        const { city, checkIn, checkOut, adults, children } = fetchParams;
        try {
            const response = await fetch(
                `http://localhost:5000/api/hotels?q=${city}&location=${city}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}&currency=TRY`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSearchParams(fetchParams);


            // Extracting the properties array and setting it in the state
            const properties = data.properties || [];
            setHotels(properties);
        } catch (error) {
            toast.error('Error fetching hotels: ', error);
        }

    };


    const handleSearch = (fetchParams) => {
        fetchHotels(fetchParams);
    };



    return (
        <>
            <div className="bg-white">
                <Navbar />
                <div className="mt-10">
                    <HotelSearchBar onSearch={handleSearch} />
                </div>
                <div>
                    {hotels.map((hotel, index) => (
                        <HotelCard
                            key={index}
                            hotel={hotel}
                            searchParams={searchParams}
                        />
                    ))}
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Hotels;


