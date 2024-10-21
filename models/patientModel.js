const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    passport: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } // Поле с автоматическим заполнением текущей даты
});

module.exports = mongoose.model('Patient', patientSchema);
