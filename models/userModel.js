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
        enum: ['Врач', 'Администратор'],
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
