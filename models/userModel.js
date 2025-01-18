const mongoose = require('mongoose');

// Схема пользователя
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true // ФИО обязательно для заполнения
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Регистратура', 'Врач', 'Администратор', 'Касса', 'Лаборатория'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Дата регистрации пользователя
    }
});

module.exports = mongoose.model('User', userSchema);
