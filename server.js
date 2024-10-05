const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/dbConfig'); // Подключение к базе данных
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patient');
const serviceRoutes = require('./routes/service'); // Маршрут для услуг
const wardRoutes = require('./routes/ward'); // Маршрут для палат

const app = express();
const PORT = 3000;

// Подключение к базе данных
connectDB();

// Middleware для обработки данных формы
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Указание папки для HTML файлов
app.use(express.static(path.join(__dirname, 'views')));

// Маршрут для главной страницы (перенаправление на страницу авторизации)
app.get('/', (req, res) => {
    res.redirect('/login'); // Перенаправляем на /login
});

// Используем маршруты авторизации, пациентов, услуг и палат
app.use(authRoutes);
app.use('/patients', patientRoutes);
app.use('/services', serviceRoutes); // Подключение маршрута для услуг
app.use('/wards', wardRoutes); // Подключение маршрута для палат

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
