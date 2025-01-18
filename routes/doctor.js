const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware для проверки токена

// Маршрут для добавления врача (защищённый маршрут)
router.post('/add', authenticateToken, doctorController.addDoctor);

// Маршрут для получения списка врачей (защищённый маршрут)
router.get('/list', authenticateToken, doctorController.getDoctors);

// Маршрут для получения врача по ID (защищённый маршрут)
router.get('/:id', authenticateToken, doctorController.getDoctorById);

// Маршрут для изменения данных врача (защищённый маршрут)
router.put('/edit/:id', authenticateToken, doctorController.updateDoctor);

// Маршрут для удаления врача (защищённый маршрут)
router.delete('/delete/:id', authenticateToken, doctorController.deleteDoctor);

module.exports = router;
