const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    passport: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
    // Удалены поля service, ward, и doctorSummary
});

module.exports = mongoose.model('Patient', patientSchema);
