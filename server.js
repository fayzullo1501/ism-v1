require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/dbConfig'); // Подключение к базе данных
const jwt = require('jsonwebtoken'); // Подключение библиотеки JWT
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patient');
const serviceRoutes = require('./routes/service'); // Маршрут для услуг
const wardRoutes = require('./routes/ward'); // Маршрут для палат
const doctorRoutes = require('./routes/doctor'); // Маршрут для врачей
const directionRoutes = require('./routes/direction');
const cashierRoutes = require('./routes/cashier');
const laboratoryRoutes = require('./routes/laboratory');
const historyRoutes = require('./routes/history');
const userRoutes = require('./routes/user'); // Подключаем маршруты для пользователей
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

// Секретный ключ для JWT (в реальном проекте хранить в .env)
const JWT_SECRET = process.env.JWT_SECRET;

// Подключение к базе данных
connectDB();

// Middleware для обработки данных формы
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Указание папки для HTML файлов
app.use(express.static(path.join(__dirname, 'views')));

app.use(cookieParser());

// Middleware для проверки JWT (защита маршрутов)
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1] || req.cookies.token;


    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Неверный токен' });
        req.user = user; // Сохраняем данные пользователя в запросе
        next();
    });
}

// Маршрут для главной страницы (перенаправление на страницу авторизации)
app.get('/', (req, res) => {
    res.redirect('/login'); // Перенаправляем на /login
});

// Используем маршруты авторизации, пациентов, услуг, палат и врачей
app.use(authRoutes);
app.use('/cashier', cashierRoutes);
app.use('/history', historyRoutes); // Подключение маршрута для истории
app.use('/users', userRoutes);
app.use('/laboratory', laboratoryRoutes);
app.use('/patients', patientRoutes); // Защита маршрута
app.use('/directions', directionRoutes); // Защита маршрута
app.use('/services', serviceRoutes); // Подключение маршрута для услуг
app.use('/wards', wardRoutes); // Подключение маршрута для палат
app.use('/doctors', doctorRoutes); // Подключение маршрута для врачей
app.use('/auth', authRoutes);


// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
