const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware для проверки токена

// Маршрут для добавления пациента (защищённый маршрут)
router.post('/add', authenticateToken, patientController.addPatient);

// Маршрут для получения списка пациентов (защищённый маршрут)
router.get('/list', authenticateToken, patientController.getPatients);

// Маршрут для получения пациента по ID (защищённый маршрут)
router.get('/:id', authenticateToken, patientController.getPatientById);

// Маршрут для изменения данных пациента (защищённый маршрут)
router.put('/edit/:id', authenticateToken, patientController.updatePatient);

// Маршрут для удаления пациента (защищённый маршрут)
router.delete('/delete/:id', authenticateToken, patientController.deletePatient);

module.exports = router;
