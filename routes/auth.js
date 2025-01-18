const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const path = require('path');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware для проверки токена

// Маршрут для страницы логина
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Обработка авторизации
router.post('/login', authController.handleLogin);

// Маршрут для панели врача (защищённый маршрут)
router.get('/dashboard-doctor', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard-doctor.html'));
});

// Маршрут для панели администратора (защищённый маршрут)
router.get('/dashboard-admin', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard-admin.html'));
});

// Маршрут для панели кассира (защищённый маршрут)
router.get('/dashboard-cashier', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard-cashier.html'));
});

// Маршрут для панели лаборатории (защищённый маршрут)
router.get('/dashboard-laboratory', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard-laboratory.html'));
});

// Маршрут для панели регистратуры (защищённый маршрут)
router.get('/dashboard-reception', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard-reception.html'));
});

router.post('/logout', (req, res) => {
    res.clearCookie('token'); // Удаление токена из куков
    return res.status(200).json({ message: 'Вы успешно вышли из системы.' });
});

module.exports = router;
