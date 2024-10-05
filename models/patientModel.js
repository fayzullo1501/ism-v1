const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    passport: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    service: { type: String, required: false },
    ward: { type: mongoose.Schema.Types.ObjectId, ref: 'Ward', required: false }, // Ссылка на палату
    doctorSummary: { type: String, required: false } // Вывод врача
});

module.exports = mongoose.model('Patient', patientSchema);
