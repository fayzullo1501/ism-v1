const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const cookieToken = req.cookies?.token; // Получаем токен из куков

    if (!token && !cookieToken) {
        return res.status(401).json({ message: 'Токен отсутствует. Авторизация необходима.' });
    }

    jwt.verify(token || cookieToken, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Неверный или истёкший токен.' });
        }

        req.user = user;
        next();
    });
};
