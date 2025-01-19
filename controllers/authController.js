const User = require('../models/userModel'); // Убедитесь, что путь корректный
const jwt = require('jsonwebtoken'); // Подключение JWT

const JWT_SECRET = process.env.JWT_SECRET;

exports.handleLogin = async (req, res) => {
    const { login, password, role } = req.body;

    try {
        const user = await User.findOne({ login, password, role });

        if (!user) {
            return res.status(401).send(`
                <script>
                    alert('Неверные данные! Пожалуйста, проверьте логин, пароль или роль.');
                    window.location.href = '/login';
                </script>
            `);
        }

        const token = jwt.sign(
            { id: user._id, login: user.login, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

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
            res.status(403).send(`
                <script>
                    alert('Роль не поддерживается.');
                    window.location.href = '/login';
                </script>
            `);
        }
    } catch (error) {
        console.error('Ошибка авторизации:', error);
        res.status(500).send(`
            <script>
                alert('Ошибка сервера. Попробуйте позже.');
                window.location.href = '/login';
            </script>
        `);
    }
};
