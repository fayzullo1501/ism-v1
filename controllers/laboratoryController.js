const Direction = require('../models/directionModel');

// Получить направления для лаборатории
exports.getLaboratoryDirections = async (req, res) => {
    try {
        const directions = await Direction.find({ isInLaboratory: true }).populate('patientId');
        res.json(directions); // Отправляем данные клиенту
    } catch (error) {
        console.error('Ошибка при загрузке направлений лаборатории:', error);
        res.status(500).json({ message: 'Ошибка сервера.' });
    }
};
