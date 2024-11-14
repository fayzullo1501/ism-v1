const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    specialty: { type: String, required: true },
    room: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    passport: { type: String, required: true },
    birthDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now } // Это поле будет включать время
});

module.exports = mongoose.model('Doctor', doctorSchema);