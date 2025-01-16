const express = require('express');
const router = express.Router();
const laboratoryController = require('../controllers/laboratoryController');

// Получить направления для лаборатории
router.get('/directions', laboratoryController.getLaboratoryDirections);

// Удалить направления из лаборатории
router.post('/directions/delete', laboratoryController.deleteLaboratoryDirections);

// Получить направление по recordId
router.get('/directions/:recordId', laboratoryController.getDirectionByRecordId);


module.exports = router;
