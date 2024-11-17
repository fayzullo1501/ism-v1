const Direction = require('../models/directionModel');

// Получить направления для кассы
exports.getDirectionsForCashier = async (req, res) => {
    try {
        const directions = await Direction.find()
            .populate('patientId', 'fullName birthDate passport phone')
            .sort({ createdAt: -1 });

        // Если направлений нет, возвращаем пустой массив с сообщением
        if (!directions || directions.length === 0) {
            return res.status(200).json({ message: 'Направления отсутствуют', directions: [] });
        }

        // Отправляем данные направлений
        res.status(200).json(directions);
    } catch (error) {
        console.error('Ошибка при получении направлений:', error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

// Получить направление по ID
exports.getDirectionById = async (req, res) => {
    try {
        const { id } = req.params;

        // Поиск направления по ID с данными пациента
        const direction = await Direction.findById(id)
            .populate('patientId', 'fullName birthDate passport phone');

        if (!direction) {
            return res.status(404).json({ message: 'Направление не найдено' });
        }

        // Отправляем данные о направлении
        res.status(200).json(direction);
    } catch (error) {
        console.error('Ошибка при получении направления:', error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

// Обновить статус оплаты
exports.updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;

        // Обновление поля "paid" для направления
        const updatedDirection = await Direction.findByIdAndUpdate(
            id,
            { paid: true },
            { new: true } // Возвращает обновлённый документ
        );

        if (!updatedDirection) {
            return res.status(404).json({ message: 'Направление не найдено' });
        }

        // Отправляем подтверждение обновления
        res.status(200).json({
            message: 'Статус оплаты успешно обновлен',
            direction: updatedDirection,
        });
    } catch (error) {
        console.error('Ошибка при обновлении статуса оплаты:', error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

// Создать новое направление (если необходимо)
exports.createDirection = async (req, res) => {
    try {
        const { patientId, serviceName, doctorName, roomNumber, wardNumber, totalPrice } = req.body;

        // Создаём новое направление
        const newDirection = new Direction({
            patientId,
            serviceName,
            doctorName,
            roomNumber,
            wardNumber,
            totalPrice,
        });

        // Сохраняем в базе данных
        const savedDirection = await newDirection.save();

        res.status(201).json({
            message: 'Новое направление успешно создано',
            direction: savedDirection,
        });
    } catch (error) {
        console.error('Ошибка при создании направления:', error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

// Удалить одно направление
exports.deleteDirection = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDirection = await Direction.findByIdAndDelete(id);

        if (!deletedDirection) {
            return res.status(404).json({ message: 'Направление не найдено' });
        }

        res.status(200).json({ message: 'Направление успешно удалено' });
    } catch (error) {
        console.error('Ошибка при удалении направления:', error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

// Удалить несколько направлений
exports.deleteDirections = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'Не указаны ID направлений для удаления.' });
        }

        const result = await Direction.deleteMany({ _id: { $in: ids } });

        res.status(200).json({
            message: `Успешно удалено ${result.deletedCount} направлений.`,
        });
    } catch (error) {
        console.error('Ошибка при удалении направлений:', error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};
