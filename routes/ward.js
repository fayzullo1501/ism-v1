const express = require('express');
const router = express.Router();
const wardController = require('../controllers/wardController');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware для проверки токена

// Маршрут для добавления палаты (защищённый маршрут)
router.post('/add', authenticateToken, wardController.addWard);

// Маршрут для получения списка палат (защищённый маршрут)
router.get('/list', authenticateToken, wardController.getWards);

// Маршрут для получения палаты по ID (защищённый маршрут)
router.get('/:id', authenticateToken, wardController.getWardById);

// Маршрут для изменения данных палаты (защищённый маршрут)
router.put('/edit/:id', authenticateToken, wardController.updateWard);

// Маршрут для удаления палаты (защищённый маршрут)
router.delete('/delete/:id', authenticateToken, wardController.deleteWard);

module.exports = router;
