const express = require('express');
const router = express.Router();
const directionController = require('../controllers/directionController');

// Маршрут для добавления направления
router.post('/add', directionController.addDirection);

// Маршрут для получения всех направлений
router.get('/list', directionController.getDirections);

// Маршрут для получения направления по ID
router.get('/:id', directionController.getDirectionById);

// Маршрут для удаления направления
router.delete('/delete/:id', directionController.deleteDirection);

// Маршрут для обновления статуса оплаты
router.post('/pay/:id', directionController.updatePaymentStatus);

module.exports = router;
