const express = require('express');
const router = express.Router();
const patientsDoctorController = require('../controllers/patientsdoctorController');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware для проверки токена

// Получить направления для врача (защищённый маршрут)
router.get('/directions', authenticateToken, patientsDoctorController.getDoctorDirections);

// Удалить направления из коллекции врача (защищённый маршрут)
router.post('/directions/delete', authenticateToken, patientsDoctorController.deleteDoctorDirections);

// Получить направление по recordId (защищённый маршрут)
router.get('/directions/:recordId', authenticateToken, patientsDoctorController.getDirectionByRecordId);

module.exports = router;
