// import mongoose from 'mongoose';

// const hotelSchema = new mongoose.Schema({
//     city: {
//         type: String,
//         required: true,
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     checkInTime: {
//         type: String,
//         required: true,
//     },
//     checkOutTime: {
//         type: String,
//         required: true,
//     },
//     checkIn: {
//         type: String,
//         required: true,
//     },
//     checkOut: {
//         type: String,
//         required: true,
//     },
//     adults: {
//         type: String,
//         required: true,
//     },
//     children: {
//         type: String,
//         required: true,
//     },
//     amenities: {
//         type: [String],
//         default: [],
//         required: true,
//     },
//     price: {
//         type: String,
//         required: true,
//     },
//     photo: {
//         type: String,
//         required: true,
//     },
// });

// const Hotel = mongoose.model('Hotel', hotelSchema);

// export default Hotel;


import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    checkInTime: {
        type: String,
        required: true,
    },
    checkOutTime: {
        type: String,
        required: true,
    },
    checkIn: {
        type: String,
        required: true,
    },
    checkOut: {
        type: String,
        required: true,
    },
    adults: {
        type: String,
        required: true,
    },
    children: {
        type: String,
        required: true,
    },
    amenities: {
        type: [String],
        default: [],
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;

