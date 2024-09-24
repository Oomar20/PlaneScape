import React from 'react';

const Images = () => {
    return (
        <div className="space-y-5 mr-10 h-72">
            <div className="relative h-full">
                <img
                    src="/assets/car_image.jpg"
                    alt="Car Rentals"
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 rounded-lg">
                    <h2 className="text-white text-xl font-bold">CAR RENTALS</h2>
                </div>
            </div>

            <div className="relative h-full">
                <img
                    src="../assets/hotels_image.jpg"
                    alt="Hotels"
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <h2 className="text-white text-xl font-bold">HOTELS</h2>
                </div>
            </div>

            <div className="relative h-full">
                <img
                    src="../assets/luggage_image.jpg"
                    alt="Travel Packages"
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <h2 className="text-white text-xl font-bold">TRAVEL PACKAGES</h2>
                </div>
            </div>
        </div>
    );
};

export default Images;
