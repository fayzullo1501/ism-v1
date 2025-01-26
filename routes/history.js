const express = require('express');
const router = express.Router();
const History = require('../models/historyModel');

// Получение истории для конкретного пациента
router.get('/:patientId', async (req, res) => {
    try {
        const history = await History.find({ patientId: req.params.patientId });
        res.json(history);
    } catch (error) {
        console.error('Ошибка при получении истории пациента:', error);
        res.status(500).json({ message: 'Ошибка при получении истории' });
    }
});

module.exports = router;
