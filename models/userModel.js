const mongoose = require('mongoose');

// Схема пользователя
const userSchema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model('User', userSchema);
