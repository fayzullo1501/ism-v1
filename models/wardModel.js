const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Название или номер палаты
    floor: { type: Number, required: true }, // Этаж, на котором находится палата
    capacity: { type: Number, required: true }, // Количество мест в палате
    currentPatients: { type: Number, default: 0 } // Текущее количество пациентов
});

module.exports = mongoose.model('Ward', wardSchema);
