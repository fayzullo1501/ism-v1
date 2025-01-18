const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware для проверки токена

// Получить всех пользователей (защищённый маршрут)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).send('Ошибка при получении пользователей');
    }
});

// Добавить нового пользователя (защищённый маршрут)
router.post('/', authenticateToken, async (req, res) => {
    const { fullName, login, password, role } = req.body;

    // Проверка на наличие роли "Администратор"
    if (role === 'Администратор') {
        return res.status(403).send('Нельзя создать администратора');
    }

    try {
        const user = new User({ fullName, login, password, role });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).send('Ошибка при добавлении пользователя');
    }
});

// Редактировать пользователя (защищённый маршрут)
router.put('/:id', authenticateToken, async (req, res) => {
    const { fullName, login, password, role } = req.body;
    const userId = req.params.id;

    // Запрещаем редактировать роль администратора
    if (role === 'Администратор') {
        return res.status(403).send('Нельзя редактировать роль администратора');
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fullName, login, password, role },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).send('Ошибка при обновлении пользователя');
    }
});

// Удалить пользователя (защищённый маршрут)
router.delete('/:id', authenticateToken, async (req, res) => {
    const userId = req.params.id;

    try {
        // Запрещаем удаление администратора
        const user = await User.findById(userId);
        if (user && user.role === 'Администратор') {
            return res.status(400).send('Нельзя удалить администратора');
        }

        await User.findByIdAndDelete(userId);
        res.status(204).send('Пользователь удален');
    } catch (err) {
        res.status(400).send('Ошибка при удалении пользователя');
    }
});

module.exports = router;
