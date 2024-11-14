const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Маршрут для добавления врача
router.post('/add', doctorController.addDoctor);

// Маршрут для получения списка врачей
router.get('/list', doctorController.getDoctors);

// Маршрут для получения врача по ID (для редактирования)
router.get('/:id', doctorController.getDoctorById);

// Маршрут для изменения данных врача
router.put('/edit/:id', doctorController.updateDoctor);

// Маршрут для удаления врача
router.delete('/delete/:id', doctorController.deleteDoctor);

module.exports = router;