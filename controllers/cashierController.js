const Laboratory = require('../models/laboratoryModel');
const DoctorDirection = require('../models/patientsdoctorModel');
const Direction = require('../models/directionModel');

// Получить направления для кассы
exports.getDirectionsForCashier = async (req, res) => {
    try {
        const directions = await Direction.find()
            .populate('patientId', 'fullName birthDate passport phone')
            .select('serviceName serviceType doctorName roomNumber wardNumber totalPrice paid updatedAt') // Добавлено serviceType и updatedAt
            .sort({ updatedAt: -1, _id: -1 });

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

// Обновить статус оплаты
exports.updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;

        // Найти направление
        const direction = await Direction.findById(id);

        if (!direction) {
            return res.status(404).json({ message: 'Направление не найдено' });
        }

        // Обновить статус оплаты
        direction.paid = true;
        direction.updatedAt = new Date(); // Обновить дату изменения
        await direction.save();

        // Проверить роль врача
        const doctorRole = direction.doctorRole;

        if (doctorRole === 'Лаборатория') {
            // Отправка в панель лаборатории
            const laboratoryData = {
                patientId: direction.patientId,
                serviceName: direction.serviceName,
                serviceType: direction.serviceType,
                doctorName: direction.doctorName,
                roomNumber: direction.roomNumber,
                wardNumber: direction.wardNumber,
                totalPrice: direction.totalPrice,
            };

            // Сохранить данные в лабораторию
            await Laboratory.create(laboratoryData);
        } else if (doctorRole === 'Врач') {
            // Отправка в панель врачей (логика аналогична)
            const doctorData = {
                patientId: direction.patientId,
                serviceName: direction.serviceName,
                serviceType: direction.serviceType,
                doctorName: direction.doctorName, // Имя врача
                roomNumber: direction.roomNumber,
                wardNumber: direction.wardNumber,
                totalPrice: direction.totalPrice,
            };
            // Сохранить данные в панель врача
            await DoctorDirection.create(doctorData);
        }

        res.status(200).json({
            message: 'Статус оплаты обновлен и данные отправлены в соответствующую панель.',
            direction,
        });
    } catch (error) {
        console.error('Ошибка при обновлении статуса оплаты:', error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};


// Создать новое направление (если необходимо)
exports.createDirection = async (req, res) => {
    try {
        const { patientId, serviceName, serviceType, doctorName, roomNumber, wardNumber, totalPrice } = req.body;

        const newDirection = new Direction({
            patientId,
            serviceName,
            serviceType,
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

// Отправка в лабораторию
exports.sendToLaboratory = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'Не выбраны направления для отправки.' });
        }

        // Находим направления по переданным ID
        const directions = await Direction.find({ _id: { $in: ids } });

        if (directions.length === 0) {
            return res.status(404).json({ message: 'Направления не найдены.' });
        }

        // Копируем данные в коллекцию лаборатории
        const laboratoryDirections = directions.map(direction => ({
            patientId: direction.patientId,
            serviceName: direction.serviceName,
            serviceType: direction.serviceType,
            doctorName: direction.doctorName,
            roomNumber: direction.roomNumber,
            wardNumber: direction.wardNumber,
            totalPrice: direction.totalPrice,
        }));

        await Laboratory.insertMany(laboratoryDirections);

        res.status(200).json({ message: 'Направления успешно отправлены в лабораторию.' });
    } catch (error) {
        console.error('Ошибка при отправке данных в лабораторию:', error);
        res.status(500).json({ message: 'Ошибка сервера.' });
    }
};

