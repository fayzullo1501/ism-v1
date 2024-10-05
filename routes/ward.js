const express = require('express');
const router = express.Router();
const wardController = require('../controllers/wardController');

// Маршрут для получения списка палат
router.get('/', wardController.getWards);

// Маршрут для добавления новой палаты
router.post('/add', wardController.addWard);

module.exports = router;
