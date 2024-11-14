const express = require('express');
const router = express.Router();
const wardController = require('../controllers/wardController');

// Маршрут для добавления палаты
router.post('/add', wardController.addWard);

// Маршрут для получения списка палат
router.get('/list', wardController.getWards);

// Маршрут для получения палаты по ID (для редактирования)
router.get('/:id', wardController.getWardById);

// Маршрут для изменения данных палаты
router.put('/edit/:id', wardController.updateWard);

// Маршрут для удаления палаты
router.delete('/delete/:id', wardController.deleteWard);

module.exports = router;