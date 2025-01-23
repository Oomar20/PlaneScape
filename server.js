import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'; // For environment variables
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Import models
import User from './models/User.js';
import Flight from './models/Flight.js';
import Hotel from './models/Hotel.js';

// Import utility data
import amenities from './amenities.js';


// Import external API
import { getJson } from 'serpapi';

// Load environment variables


// Initialize the app
const app = express();

// Middleware
dotenv.config({ path: './keys.env' });
app.use(bodyParser.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    if (!token) return res.status(401).json({ message: 'Access denied, token missing.' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token.' });
        req.user = user;
        next();
    });
};


// Routes

// User registration
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// User login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 }, // Add 1-hour expiration
            JWT_SECRET
        );


        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user', error });
    }
});


// Fetch booked flights for the authenticated user
app.get('/api/flights', authenticateToken, async (req, res) => {
    const userId = req.user.userId;  // Extract userId from the authenticated token

    try {
        const flights = await Flight.find({ userId });  // Fetch only flights booked by this user
        res.json(flights);
    } catch (err) {
        console.error('Error fetching booked flights:', err);
        res.status(500).json({ message: 'Failed to fetch booked flights', error: err.message });
    }
});



// Book a flight
app.post('/api/bookFlight', authenticateToken, async (req, res) => {
    const { flightNumber, icao_code, departureAirport, arrivalAirport, scheduleTime, estimatedLandingTime } = req.body;
    const userId = req.user.userId;  // Extract userId from authenticated token

    try {
        const flight = new Flight({
            flightNumber,
            icao_code,
            departureAirport,
            arrivalAirport,
            scheduleTime,
            estimatedLandingTime,
            userId,
        });

        await flight.save();
        res.status(200).json({ message: 'Flight booked successfully', flight });
    } catch (error) {
        console.error('Error booking flight:', error);
        res.status(500).json({ message: 'Error booking flight', error });
    }
});

// DELETE route to remove a booked flight
app.delete('/api/flights/:id', authenticateToken, async (req, res) => {
    const flightId = req.params.id;
    const userId = req.user.userId;  // Extract userId from the authenticated token

    try {
        const flight = await Flight.findOneAndDelete({ _id: flightId, userId });  // Ensure flight belongs to this user

        if (!flight) {
            return res.status(404).json({ message: 'Flight not found or not owned by user' });
        }

        res.status(200).json({ message: 'Flight removed successfully' });
    } catch (error) {
        console.error('Error deleting flight:', error);
        res.status(500).json({ message: 'Server error' });
    }
});




app.get('/api/hotels', async (req, res) => {
    const { location, checkIn, checkOut, adults, currency } = req.query;

    try {
        const response = await getJson({
            api_key: process.env.SERPAPI_KEY,
            engine: "google_hotels",
            q: location,
            check_in_date: checkIn,
            check_out_date: checkOut,
            adults,
            children: "0",
            gl: "tr",
            hl: "en",
            currency,
        });

        // console.log('Response from SerpAPI:', response);

        res.status(200).json(response); // Return the fetched hotel data
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({ message: 'Error fetching hotels', error });
    }
});

// Book a hotel
app.post('/api/bookHotels', authenticateToken, async (req, res) => {

    const {
        city,
        name,
        checkInTime,
        checkOutTime,
        checkIn,
        checkOut,
        adults,
        children,
        amenities,
        price,
        photo,
        userId,
    } = req.body;


    try {
        // Validate required fields
        if (!city || !name || !checkIn || !checkOut || !adults || !price) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new hotel document
        const newHotel = new Hotel({
            city,
            name,
            checkInTime,
            checkOutTime,
            checkIn,
            checkOut,
            adults,
            children,
            price,
            photo,
            amenities: amenities || [],
            userId,
        });

        // Save the hotel to the database
        await newHotel.save();

        // Send a success response
        res.status(201).json({
            message: 'Hotel booking added successfully',
            hotel: newHotel,
        });
    } catch (error) {
        console.error('Error adding hotel booking:', error);
        res.status(500).json({
            message: 'Failed to add hotel booking',
            error: error.message,
        });
    }
});


// Fetch booked hotels for the authenticated user
app.get('/api/bookedHotels', authenticateToken, async (req, res) => {
    const userId = req.user.userId;  // Extract userId from the authenticated token
    // console.log(userId);

    try {
        const hotels = await Hotel.find({ userId });  // Fetch only hotels booked by this user
        res.json(hotels);
    } catch (err) {
        console.error('Error fetching booked hotels:', err);
        res.status(500).json({ message: 'Failed to fetch booked hotels', error: err.message });
    }
});

// DELETE route to remove a booked hotel
app.delete('/api/bookedHotels/:id', authenticateToken, async (req, res) => {
    const hotelId = req.params.id;
    const userId = req.user.userId;  // Extract userId from the authenticated token

    try {
        const hotel = await Hotel.findOneAndDelete({ _id: hotelId, userId });  // Ensure hotel belongs to this user

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found or not owned by user' });
        }

        res.status(200).json({ message: 'Hotel removed successfully' });
    } catch (error) {
        console.error('Error deleting hotel:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



// Fetch amenities
app.get('/api/amenities', (req, res) => {
    res.status(200).json(amenities);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
