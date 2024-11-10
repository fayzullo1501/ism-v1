const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    specialty: { type: String, required: true }, // Связанное наименование услуги
    room: { type: String, required: true }, // Номер комнаты
    passport: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doctor', doctorSchema);
