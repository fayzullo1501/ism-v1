const express = require('express');
const router = express.Router();
const directionController = require('../controllers/directionController');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware для проверки токена
const historyController = require('../controllers/historyController'); // Контроллер для работы с историей

// Маршрут для добавления направления (защищённый маршрут)
router.post('/add', authenticateToken, async (req, res) => {
    try {
        // Создаём направление через контроллер
        const direction = await directionController.addDirection(req, res);

        if (direction) {
            // Если направление успешно создано, создаём запись в истории
            await historyController.addHistoryFromDirection(direction);
            res.status(201).json({ message: 'Направление и история успешно сохранены', direction });
        }
    } catch (error) {
        console.error('Ошибка при сохранении направления и истории:', error);
        res.status(500).json({ message: 'Ошибка при сохранении данных' });
    }
});

// Маршрут для получения всех направлений (защищённый маршрут)
router.get('/list', authenticateToken, directionController.getDirections);

// Маршрут для получения направления по ID (защищённый маршрут)
router.get('/:id', authenticateToken, directionController.getDirectionById);

// Маршрут для удаления направления (защищённый маршрут)
router.delete('/delete/:id', authenticateToken, directionController.deleteDirection);

// Маршрут для обновления статуса оплаты (защищённый маршрут)
router.post('/pay/:id', authenticateToken, directionController.updatePaymentStatus);

module.exports = router;
