const mongoose = require('mongoose');
const User = require('./models/userModel'); // Импорт модели пользователя
const connectDB = require('./config/dbConfig'); // Подключение к базе данных

// Функция для создания пользователя (только админа)
const createUsers = async () => {
    try {
        // Подключение к базе данных
        await connectDB();

        // Проверка на наличие администратора в базе данных
        let admin = await User.findOne({ role: 'Администратор' });
        
        if (!admin) {
            // Создание администратора, если его нет в базе
            admin = new User({
                login: 'admin1',
                password: 'adminpass', // Убедитесь, что пароль хэшируется при сохранении
                role: 'Администратор'
            });
            await admin.save();
            console.log('Администратор создан.');
        }

    } catch (err) {
        console.error('Ошибка при создании пользователей:', err);
    }
};

createUsers();
