const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date : {
    type: String,
    required: true
    },
    slots: [
        {
           type: String,
           required: true
        }
    ]
},
{id : false}
);

const expertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'expert name is required'],
        trim : true,
        index : true
    },
    category: {
        type: String,
        required: [true, 'category is required'],
        index : true
    },
    experience: {
        type: Number,
        required: [true, 'experience is required'],
        min : [0, 'experience must be a positive number']
    },
    rating: {
        type: Number,
        required: [true, 'rating is required'],
        min : [0, 'rating must be a positive number'],
        max : [5, 'rating must be less than or equal to 5']
    },

    availableSlots: [slotSchema],
},
{timestamps : true}
);

expertSchema.index({ name: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('Expert', expertSchema);