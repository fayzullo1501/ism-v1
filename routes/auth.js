const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const path = require('path');

// Маршрут для страницы логина
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html')); // Убедитесь, что путь корректный
});

// Обработка авторизации
router.post('/login', authController.handleLogin);

// Маршрут для панели врача
router.get('/dashboard-doctor', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard-doctor.html')); // Убедитесь, что путь корректный
});

// Маршрут для панели администратора
router.get('/dashboard-admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard-admin.html')); // Убедитесь, что путь корректный
});

module.exports = router;
