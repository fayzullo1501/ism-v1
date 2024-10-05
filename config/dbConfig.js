const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://fayzeeuz:fayzullo1501@cluster0.gkmjh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            // Убираем устаревшие параметры
        });
        console.log('Успешное подключение к MongoDB');
    } catch (err) {
        console.error('Ошибка подключения к MongoDB:', err);
        process.exit(1); // Останавливаем процесс, если подключение не удалось
    }
};

module.exports = connectDB;
