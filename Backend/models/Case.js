const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    caseNumber: {
        type: String,
        required: true,
        trim: true,
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Truck'
    },
    marketDate: {
        type: String,
        required: true,
        trim: true,
    },
    returnDate: {
        type: String,
        required: false,
        trim: true,
    },
    weight: {
        type: Number,
        default: 0
    },
    bilty: {
        type: String,
        default: null
    },
    balance: {
        type: Number,
        default: null
    },
    from: {
        type: String,
        default: null
    },
    to: {
        type: String,
        default: null
    },
    empty: {
        type: String,
        default: null
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    broker: {
        type: String,
        default: null
    },
    frieght: {
        type: String,
        default: null
    },
    emptyFrieght: {
        type: String,
        default: null
    },
    returnFrieght: {
        type: String,
        default: null

    },
    status: {
        type: String,
        default: null
    },

}, {
    timestamps: true
});

const Case = mongoose.model("Case", caseSchema)

module.exports = Case