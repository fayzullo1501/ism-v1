const express = require('express');
const router = express.Router();
const cashierController = require('../controllers/cashierController');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware для проверки токена

// Получить направления для кассы (защищённый маршрут)
router.get('/directions', authenticateToken, cashierController.getDirectionsForCashier);

// Обновить статус оплаты (защищённый маршрут)
router.post('/directions/pay/:id', authenticateToken, cashierController.updatePaymentStatus);

// Получить данные о направлении по ID (защищённый маршрут)
router.get('/directions/:id', authenticateToken, cashierController.getDirectionById);

// Удалить выбранные направления (защищённый маршрут)
router.post('/directions/delete', authenticateToken, cashierController.deleteDirections);

// Маршрут для отправки направлений в лабораторию (защищённый маршрут)
router.post('/directions/laboratory', authenticateToken, cashierController.sendToLaboratory);

router.post('/logout', (req, res) => {
    res.clearCookie('token'); // Удаление токена из куков
    return res.status(200).json({ message: 'Вы успешно вышли из системы.' });
});

module.exports = router;
