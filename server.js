// Replace require with import
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import your models
import Flight from './models/Flight.js';  // Make sure to add .js if you're using ES modules

// Initialize the app
const app = express();

// Use middleware
app.use(bodyParser.json());
app.use(cors());


// MongoDB connection 
mongoose.connect('mongodb+srv://amrouaboukhaled:PD9BNWYp3Zx7NReQ@flightscluster.1vdha.mongodb.net/?retryWrites=true&w=majority&appName=FlightsCluster')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


/// POST endpoint to book flight
app.post('/api/bookFlight', async (req, res) => {
    const { flightNumber, airlines, departureAirport, arrivalAirport, scheduleTime, estimatedLandingTime } = req.body;

    try {
        const flight = new Flight({
            flightNumber,
            airlines,
            departureAirport,
            arrivalAirport,
            scheduleTime,
            estimatedLandingTime,
        });

        await flight.save();
        res.status(200).json({ message: 'Flight booked successfully', flight });
    } catch (error) {
        console.error('Error booking flight:', error);
        res.status(500).json({ message: 'Error booking flight', error });
    }
});


app.get('/api/flights', async (req, res) => {
    try {
        const flights = await Flight.find();  // Fetch all flights from MongoDB
        res.status(200).json(flights);  // Return flights in the response
    } catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).json({ message: 'Error fetching flights', error });
    }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
