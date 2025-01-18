const express = require('express');
const router = express.Router();
const directionController = require('../controllers/directionController');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware для проверки токена

// Маршрут для добавления направления (защищённый маршрут)
router.post('/add', authenticateToken, directionController.addDirection);

// Маршрут для получения всех направлений (защищённый маршрут)
router.get('/list', authenticateToken, directionController.getDirections);

// Маршрут для получения направления по ID (защищённый маршрут)
router.get('/:id', authenticateToken, directionController.getDirectionById);

// Маршрут для удаления направления (защищённый маршрут)
router.delete('/delete/:id', authenticateToken, directionController.deleteDirection);

// Маршрут для обновления статуса оплаты (защищённый маршрут)
router.post('/pay/:id', authenticateToken, directionController.updatePaymentStatus);

module.exports = router;
