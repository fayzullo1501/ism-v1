const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Маршрут для получения списка услуг
router.get('/', serviceController.getServices);

// Маршрут для добавления новой услуги
router.post('/add', serviceController.addService);

module.exports = router;
