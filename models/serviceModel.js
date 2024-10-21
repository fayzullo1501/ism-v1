const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceName: { type: String, required: false },
    serviceType: { type: String, required: false },
    serviceAbout: { type: String, required: false},
    servicePrice: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now } // Поле с автоматическим заполнением текущей даты
});

module.exports = mongoose.model('Service', serviceSchema);
