const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Название услуги
    description: { type: String, required: false }, // Описание услуги
    price: { type: Number, required: true } // Цена услуги
});

module.exports = mongoose.model('Service', serviceSchema);
