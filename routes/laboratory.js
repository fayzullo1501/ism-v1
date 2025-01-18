const express = require('express');
const router = express.Router();
const laboratoryController = require('../controllers/laboratoryController');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware для проверки токена

// Получить направления для лаборатории (защищённый маршрут)
router.get('/directions', authenticateToken, laboratoryController.getLaboratoryDirections);

// Удалить направления из лаборатории (защищённый маршрут)
router.post('/directions/delete', authenticateToken, laboratoryController.deleteLaboratoryDirections);

// Получить направление по recordId (защищённый маршрут)
router.get('/directions/:recordId', authenticateToken, laboratoryController.getDirectionByRecordId);

module.exports = router;
