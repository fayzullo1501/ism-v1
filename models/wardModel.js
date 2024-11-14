const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
    wardNumber: { type: String, required: true, unique: true }, // Номер палаты
    wardType: { type: String, required: true }, // Тип палаты
    wardCapacity: { type: Number, required: true }, // Количество мест
    wardPrice: { type: Number, required: true }, // Цена
    createdAt: { type: Date, default: Date.now } // Поле с автоматическим заполнением текущей даты
});

module.exports = mongoose.model('Ward', wardSchema);