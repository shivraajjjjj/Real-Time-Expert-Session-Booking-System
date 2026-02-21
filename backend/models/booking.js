const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    expert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expert',
        required: true
    },
    name : {
        type: String,
        required: [true, 'name is required'],
        trim : true
    },
    email : {
        type: String,
        required: [true, 'email is required'],
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    phone : {
        type: String,
        required: [true, 'phone number is required'],
        minlength: [10, 'phone number must be at least 10 digits'],
        maxlength: [15, 'phone number must be at most 15 digits']
    },
    date : {
        type: String,
        required: [true, 'date is required']
    },
    timeSlot : {
        type: String,
        required: [true, 'time slot is required']
    },
    notes : {
        type: String,
        trim : true,
        maxlength: [500, 'notes must be less than 500 characters']
    },
    status : {
        type: String,
        enum: ['pending', 'confirmed', 'completed'],
        default: 'pending'
    }   
},
{timestamps : true}
);
bookingSchema.index({ expert: 1, date: 1, timeSlot: 1}, { unique: true });
bookingSchema.index({ email: 1});
module.exports = mongoose.model('Booking', bookingSchema);