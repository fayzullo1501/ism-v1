const User = require('../models/userModel'); // Убедитесь, что путь корректный

exports.handleLogin = async (req, res) => {
    const { login, password, role } = req.body;

    try {
        // Поиск пользователя в базе данных
        const user = await User.findOne({ login: login, password: password, role: role });

        if (!user) {
            return res.send('Неверные данные!'); // Отправка сообщения об ошибке
        }

        // Успешная авторизация
        if (role === 'Врач') {
            res.redirect('/dashboard-doctor'); // Перенаправление на панель врача
        } else if (role === 'Администратор') {
            res.redirect('/dashboard-admin'); // Перенаправление на панель администратора
        } else if (role === 'Касса') {
            res.redirect('/dashboard-cashier'); // Перенаправление на панель кассира
        } else if (role === 'Лаборатория') {
            res.redirect('/dashboard-laboratory'); // Перенаправление на панель лаборатории
        } else if (role === 'Регистратура') {
            res.redirect('/dashboard-reception'); // Перенаправление на панель регистрации
        }
    } catch (error) {
        res.status(500).send('Ошибка сервера'); // Сообщение об ошибке сервера
    }
};
