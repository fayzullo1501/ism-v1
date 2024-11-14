const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const path = require('path');

// Маршрут для страницы логина
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html')); 
});

// Обработка авторизации
router.post('/login', authController.handleLogin);

// Маршрут для панели врача
router.get('/dashboard-doctor', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard-doctor.html')); 
});

// Маршрут для панели администратора
router.get('/dashboard-admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard-admin.html')); 
});

// Маршрут для панели кассира
router.get('/dashboard-cashier', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard-cashier.html')); 
});

// Маршрут для панели лаборатории
router.get('/dashboard-laboratory', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard-laboratory.html')); 
});

// Маршрут для панели регистратуры
router.get('/dashboard-reception', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard-reception.html')); 
});

module.exports = router;
