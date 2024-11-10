const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Маршрут для добавления врача
router.post('/add', doctorController.addDoctor);

// Маршрут для получения списка врачей
router.get('/list', doctorController.getDoctors);

// Маршрут для получения списка специальностей (услуг)
router.get('/specialties', doctorController.getSpecialties);

// Маршрут для получения данных врача по ID
router.get('/:id', doctorController.getDoctorById);

// Маршрут для обновления данных врача
router.put('/edit/:id', doctorController.updateDoctor);

// Маршрут для удаления врача
router.delete('/delete/:id', doctorController.deleteDoctor);

module.exports = router;
