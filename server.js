// Import necessary packages using ES modules
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'; // Use import for dotenv

// Import your models
import Flight from './models/Flight.js';  // Ensure .js extension for ES modules

// Load environment variables from .env file
dotenv.config();  // This will load the variables from .env

// Initialize the app
const app = express();

// Use middleware
app.use(bodyParser.json());
app.use(cors());

// Use the environment variables in your connection string
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/?retryWrites=true&w=majority&appName=${process.env.MONGODB_DB_NAME}`;

// MongoDB connection 
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,  // Options for the connection
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// POST endpoint to book a flight
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

// GET endpoint to fetch all flights
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
