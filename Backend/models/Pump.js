const mongoose = require('mongoose');

const pumpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: false,
        trim: true,
    },
    ownerName: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: Number,
        required: false,
        trim: true,
    },
    isDeleted: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

const Pump = mongoose.model("Pump", pumpSchema)

module.exports = Pump