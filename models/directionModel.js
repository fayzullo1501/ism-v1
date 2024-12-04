const mongoose = require('mongoose');

const directionSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    serviceName: { type: String, default: '' },
    doctorName: { type: String, default: '' },
    roomNumber: { type: String, default: '' }, // Поле для номера кабинета врача
    wardNumber: { type: String, default: '' },
    wardDays: { type: Number, default: 1 },
    wardCapacity: { type: Number, default: 1 },
    totalPrice: { type: Number, default: 0 },
    paid: { type: Boolean, default: false }, // Статус оплаты
    isInLaboratory: { type: Boolean, default: false }, // Новое поле
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Direction', directionSchema);
