const express = require('express');
const router = express.Router();
const laboratoryController = require('../controllers/laboratoryController');

// Маршрут для получения направлений лаборатории
router.get('/directions', laboratoryController.getLaboratoryDirections);

module.exports = router;
