const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    truckNumber: {
        type: String,
        required: true,
        trim: true,
    },
    chassisNumber : {
        type: String,
        required: false,
        trim: true,
    },
    truckOwner: {
        type: String,
        required: true,
        trim: true,
    },
    frameNumber: {
        type: Number,
        required: false,
        trim: true,
    },
    wheels: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

const Truck = mongoose.model("Truck", truckSchema)

module.exports = Truck