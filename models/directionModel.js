const mongoose = require('mongoose');

const directionSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    serviceName: { type: String, default: '' },
    serviceType: { type: String, default: '' }, // Категория услуги
    doctorName: { type: String, default: '' },
    roomNumber: { type: String, default: '' },
    wardNumber: { type: String, default: '' },
    wardDays: { type: Number, default: 1 },
    wardCapacity: { type: Number, default: 1 },
    totalPrice: { type: Number, default: 0 },
    paid: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now }, // Дата обновления
});

module.exports = mongoose.model('Direction', directionSchema);