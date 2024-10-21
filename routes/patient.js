const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Маршрут для добавления пациента
router.post('/add', patientController.addPatient);

// Маршрут для получения списка пациентов
router.get('/list', patientController.getPatients);

// Маршрут для получения пациента по ID (для редактирования)
router.get('/:id', patientController.getPatientById);

// Маршрут для изменения данных пациента
router.put('/edit/:id', patientController.updatePatient);

// Маршрут для удаления пациента
router.delete('/delete/:id', patientController.deletePatient);


module.exports = router;
