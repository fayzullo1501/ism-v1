const Direction = require('../models/directionModel');
const Patient = require('../models/patientModel'); // Модель пациента

// Контроллер для добавления направления
exports.addDirection = async (req, res) => {
    try {
        const { patientId, serviceName, doctorName, wardNumber, wardDays, wardCapacity, roomNumber, totalPrice } = req.body;

        // Проверка существования пациента
        const patientExists = await Patient.findById(patientId);
        if (!patientExists) {
            return res.status(404).json({ message: 'Пациент не найден' });
        }

        // Приведение данных и расчет общей стоимости
        const parsedWardDays = parseInt(wardDays) || 1; // Количество дней
        const parsedWardCapacity = parseInt(wardCapacity) || 1; // Количество мест
        const parsedTotalPrice = parseFloat(totalPrice) || 0;

        // Расчет итоговой стоимости
        const calculatedTotalPrice = parsedTotalPrice * parsedWardCapacity * parsedWardDays;

        // Создание нового направления
        const newDirection = new Direction({
            patientId,
            serviceName: serviceName || 'Не указано',
            doctorName: doctorName || 'Не указано',
            roomNumber: roomNumber || 'Не указано',
            wardNumber: wardNumber || 'Не указано',
            wardDays: parsedWardDays,
            wardCapacity: parsedWardCapacity,
            totalPrice: calculatedTotalPrice
        });

        await newDirection.save();
        res.status(201).json({ message: 'Направление успешно создано', direction: newDirection });
    } catch (error) {
        console.error('Ошибка при создании направления:', error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

// Контроллер для получения всех направлений
exports.getDirections = async (req, res) => {
    try {
        const directions = await Direction.find()
            .populate('patientId', 'fullName birthDate passport phone') // Подтягиваем данные пациента
            .sort({ createdAt: -1 });

        res.status(200).json(directions);
    } catch (error) {
        console.error('Ошибка при получении направлений:', error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

// Контроллер для обновления статуса оплаты направления
exports.updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedDirection = await Direction.findByIdAndUpdate(
            id,
            { paid: true },
            { new: true } // Возвращает обновленный документ
        );

        if (!updatedDirection) {
            return res.status(404).json({ message: 'Направление не найдено' });
        }

        res.status(200).json({ message: 'Статус оплаты успешно обновлен', direction: updatedDirection });
    } catch (error) {
        console.error('Ошибка при обновлении статуса оплаты:', error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

// Контроллер для получения направления по ID
exports.getDirectionById = async (req, res) => {
    try {
        const { id } = req.params;

        const direction = await Direction.findById(id).populate('patientId', 'fullName birthDate passport phone');
        if (!direction) {
            return res.status(404).json({ message: 'Направление не найдено' });
        }

        res.status(200).json(direction);
    } catch (error) {
        console.error('Ошибка при получении направления:', error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

// Контроллер для удаления направления
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
