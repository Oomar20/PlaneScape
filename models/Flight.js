// import mongoose from 'mongoose';

// const flightSchema = new mongoose.Schema({
//     flightNumber: { type: String, required: true },          // Flight number
//     icao_code: { type: String, required: true },
//     departureAirport: { type: String, required: true },      // Departure airport code
//     arrivalAirport: { type: String, required: true },        // Arrival airport code
//     scheduleTime: { type: String, required: true },          // Scheduled departure time
//     estimatedLandingTime: { type: String, required: true },  // Estimated landing time
// });

// const Flight = mongoose.model('Flight', flightSchema);

// export default Flight;


import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,
    },
    flightNumber: {
        type: String,
        required: true
    },          // Flight number
    icao_code: {
        type: String,
        required: true
    },
    departureAirport: {
        type: String,
        required: true
    },      // Departure airport code
    arrivalAirport: {
        type: String,
        required: true
    },        // Arrival airport code
    scheduleTime: {
        type: String,
        required: true
    },          // Scheduled departure time
    estimatedLandingTime: {
        type: String,
        required: true
    },  // Estimated landing time
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;
