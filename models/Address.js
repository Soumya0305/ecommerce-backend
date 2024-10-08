const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true},
    houseNumber: { type: String, required: true },
    addressLine: { type: String, required: true }, // Address for name
    locality: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    name: {type: String, required: true},
    mobileNumber: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
});

module.exports = mongoose.model('Address', addressSchema);