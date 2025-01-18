const User = require('../models/userModel'); // Убедитесь, что путь корректный
const jwt = require('jsonwebtoken'); // Подключение JWT

// Секретный ключ для подписи токенов
const JWT_SECRET = process.env.JWT_SECRET;

exports.handleLogin = async (req, res) => {
    const { login, password, role } = req.body;

    try {
        // Поиск пользователя в базе данных
        const user = await User.findOne({ login: login, password: password, role: role });

        if (!user) {
            return res.status(401).json({ message: 'Неверные данные!' }); // Возвращаем ошибку авторизации
        }

        // Генерация токена
        const token = jwt.sign(
            { id: user._id, login: user.login, role: user.role }, // Данные для токена
            JWT_SECRET,
            { expiresIn: '24h' } // Срок действия токена
        );

        // Сохранение токена в куках для клиента
        res.cookie('token', token, { httpsOnly: true, maxAge: 3600000 }); // Срок действия: 1 час

        // Перенаправление в зависимости от роли
        if (user.role === 'Администратор') {
            res.redirect('/dashboard-admin.html');
        } else if (user.role === 'Касса') {
            res.redirect('/dashboard-cashier.html');
        } else if (user.role === 'Врач') {
            res.redirect('/dashboard-doctor.html');
        } else if (user.role === 'Регистратура') {
            res.redirect('/dashboard-reception.html');
        } else if (user.role === 'Лаборатория') {
            res.redirect('/dashboard-laboratory.html');
        } else {
            res.status(403).send('Роль не поддерживается');
        }
        

    } catch (error) {
        console.error('Ошибка авторизации:', error);
        res.status(500).json({ message: 'Ошибка сервера' }); // Сообщение об ошибке сервера
    }
};
