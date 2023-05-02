const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    phone: {
        type: Number,
        trim: true,
    },
    cnic: {
        type: String,
        trim: true,
    },
    license: {
        type: String,
        trim: true,
    },
    isDeleted: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

const Driver = mongoose.model("Driver", driverSchema)

module.exports = Driver