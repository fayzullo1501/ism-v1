const mongoose = require('mongoose');

const doctorDirectionSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    serviceName: { type: String, required: true },
    serviceType: { type: String },
    doctorName: { type: String },
    roomNumber: { type: String },
    wardNumber: { type: String },
    totalPrice: { type: Number },
    results: { type: String, default: '' }, // Поле для результата анализа (если нужно)
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DoctorDirection', doctorDirectionSchema);
