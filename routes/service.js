const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware для проверки токена

// Маршрут для добавления услуги (защищённый маршрут)
router.get('/', authenticateToken, serviceController.addService);

// Маршрут для добавления услуги (защищённый маршрут)
router.post('/add', authenticateToken, serviceController.addService);

// Маршрут для получения списка услуг (защищённый маршрут)
router.get('/list', authenticateToken, serviceController.getServices);

// Маршрут для получения услуги по ID (защищённый маршрут)
router.get('/:id', authenticateToken, serviceController.getServiceById);

// Маршрут для изменения данных услуги (защищённый маршрут)
router.put('/edit/:id', authenticateToken, serviceController.updateService);

// Маршрут для удаления услуги (защищённый маршрут)
router.delete('/delete/:id', authenticateToken, serviceController.deleteService);

module.exports = router;
