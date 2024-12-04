const Direction = require('../models/directionModel');

// Получить направления для кассы
exports.getDirectionsForCashier = async (req, res) => {
    try {
        const directions = await Direction.find()
            .populate('patientId', 'fullName birthDate passport phone')
            .sort({ createdAt: -1 });

        if (!directions || directions.length === 0) {
            return res.status(200).json({ message: 'Направления отсутствуют', directions: [] });
        }

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

        const direction = await Direction.findById(id)
            .populate('patientId', 'fullName birthDate passport phone');

        if (!direction) {
            return res.status(404).json({ message: 'Направление не найдено' });
        }

        res.status(200).json(direction);
    } catch (error) {
        console.error('Ошибка при получении направления:', error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

// Обновить статус оплаты и автоматически отправить в лабораторию, если категория "Лаборатория"
exports.updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const direction = await Direction.findById(id);

        if (!direction) {
            return res.status(404).json({ message: 'Направление не найдено' });
        }

        // Обновляем статус оплаты
        direction.paid = true;

        // Проверяем категорию услуги
        if (direction.serviceCategory && 
            (direction.serviceCategory.toLowerCase() === 'лаборатория' || direction.serviceCategory.toLowerCase() === 'laboratoriya')) {
            direction.isInLaboratory = true; // Помечаем как "в лаборатории"
        }

        const updatedDirection = await direction.save();

        res.status(200).json({
            message: 'Статус оплаты успешно обновлен.',
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
        const { patientId, serviceName, serviceCategory, doctorName, roomNumber, wardNumber, totalPrice } = req.body;

        const newDirection = new Direction({
            patientId,
            serviceName,
            serviceCategory,
            doctorName,
            roomNumber,
            wardNumber,
            totalPrice,
        });

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

// Отправить направление в лабораторию (по запросу)
exports.sendToLaboratory = async (req, res) => {
    const { directionId } = req.body;

    try {
        const direction = await Direction.findById(directionId);

        if (!direction) {
            return res.status(404).json({ message: 'Направление не найдено.' });
        }

        // Проверяем категорию услуги
        if (direction.serviceCategory.toLowerCase() !== 'лаборатория' && direction.serviceCategory.toLowerCase() !== 'laboratoriya') {
            return res.status(400).json({ message: 'Категория услуги не является лабораторией.' });
        }

        // Помечаем направление как "в лаборатории"
        direction.isInLaboratory = true; // Поле должно быть добавлено в схему
        await direction.save();

        res.status(200).json({
            message: 'Направление успешно отправлено в лабораторию.',
            direction,
        });
    } catch (error) {
        console.error('Ошибка при отправке направления в лабораторию:', error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};
