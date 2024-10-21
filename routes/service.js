const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Маршрут для добавления пациента
router.post('/add', serviceController.addService);

// Маршрут для получения списка пациентов
router.get('/list', serviceController.getServices);

// Маршрут для получения пациента по ID (для редактирования)
router.get('/:id', serviceController.getServiceById);

// Маршрут для изменения данных пациента
router.put('/edit/:id', serviceController.updateService);

// Маршрут для удаления пациента
router.delete('/delete/:id', serviceController.deleteService);


module.exports = router;
