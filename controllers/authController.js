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
        }
    } catch (error) {
        res.status(500).send('Ошибка сервера'); // Сообщение об ошибке сервера
    }
};
