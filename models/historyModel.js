const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    serviceName: { type: String, default: '' },
    serviceType: { type: String, default: '' }, // Категория услуги
    doctorName: { type: String, default: '' },
    roomNumber: { type: String, default: '' },
    wardNumber: { type: String, default: '' },
    wardDays: { type: Number, default: 1 },
    wardType: { type: String, default: '' },
    wardCapacity: { type: Number, default: 1 },
    totalPrice: { type: Number, default: 0 },
    result: { type: String, default: 'Нет данных' }, // Новое поле для результата
    createdAt: { type: Date, default: Date.now }, // Дата создания
});

module.exports = mongoose.model('History', historySchema);
