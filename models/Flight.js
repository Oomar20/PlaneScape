import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
    flightNumber: { type: String, required: true },          // Flight number
    airlines: { type: String, required: true },
    departureAirport: { type: String, required: true },      // Departure airport code
    arrivalAirport: { type: String, required: true },        // Arrival airport code
    scheduleTime: { type: String, required: true },          // Scheduled departure time
    estimatedLandingTime: { type: String, required: true },  // Estimated landing time
});

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;
