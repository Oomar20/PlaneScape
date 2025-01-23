import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MyHotelsCard from '../components/MyHotelsCard'

const MyHotels = () => {


    return (
        <div style={{ backgroundColor: '#f6f4f9' }}>
            <Navbar />
            <div className='pt-10'>
                <MyHotelsCard />
            </div>
        </div>
    );
};

export default MyHotels;
