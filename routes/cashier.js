const express = require('express');
const router = express.Router();
const cashierController = require('../controllers/cashierController');

// Получить направления для кассы
router.get('/directions', cashierController.getDirectionsForCashier);

// Обновить статус оплаты
router.post('/directions/pay/:id', cashierController.updatePaymentStatus);

// Получить данные о направлении по ID
router.get('/directions/:id', cashierController.getDirectionById);

// Удалить выбранные направления
router.post('/directions/delete', cashierController.deleteDirections);

// Маршрут для отправки в лабораторию
router.post('/directions/laboratory', cashierController.sendToLaboratory);


module.exports = router;
