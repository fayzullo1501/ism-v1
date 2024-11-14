const mongoose = require('mongoose');
const User = require('./models/userModel'); // Импорт модели пользователя
const connectDB = require('./config/dbConfig'); // Подключение к базе данных

// Функция для создания пользователей
const createUsers = async () => {
    try {
        // Подключение к базе данных
        await connectDB();

        // Создание новых пользователей
        const users = [
            { login: 'doctor1', password: 'password123', role: 'Врач' },
            { login: 'admin1', password: 'adminpass', role: 'Администратор' },
            { login: 'cashier1', password: 'cashierpass', role: 'Касса' },
            { login: 'lab1', password: 'labpass', role: 'Лаборатория' }, 
            { login: 'reg1', password: 'regpass', role: 'Регистратура' }  
        ];

        // Сохранение пользователей в базе данных
        for (const userData of users) {
            const user = new User(userData);
            await user.save();
        }

        console.log('Пользователи успешно созданы');
        process.exit(); // Завершение процесса
    } catch (error) {
        console.error('Ошибка при создании пользователей:', error);
        process.exit(1); // Завершение процесса с ошибкой
    }
};

createUsers();
