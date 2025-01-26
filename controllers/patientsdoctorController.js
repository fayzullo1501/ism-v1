const DoctorDirection = require('../models/patientsdoctorModel');

// Получить направления для врача
exports.getDoctorDirections = async (req, res) => {
    try {
        const directions = await DoctorDirection.find()
            .populate('patientId', 'fullName birthDate passport phone')
            .sort({ createdAt: -1 }); // Сортировка по дате создания

        res.status(200).json(directions);
    } catch (error) {
        console.error('Ошибка при получении данных для врача:', error);
        res.status(500).json({ message: 'Ошибка сервера.' });
    }
};

// Удалить направления из панели врача
exports.deleteDoctorDirections = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'Не выбраны записи для удаления.' });
        }

        const result = await DoctorDirection.deleteMany({ _id: { $in: ids } });

        res.status(200).json({
            message: `Успешно удалено ${result.deletedCount} записей.`,
        });
    } catch (error) {
        console.error('Ошибка при удалении записей врача:', error);
        res.status(500).json({ message: 'Ошибка сервера.' });
    }
};


// Получить направление по recordId
exports.getDirectionByRecordId = async (req, res) => {
    try {
        const { recordId } = req.params;

        // Найти направление по ID и подтянуть данные пациента
        const direction = await DoctorDirection.findById(recordId)
            .populate('patientId', 'fullName birthDate phone');

        if (!direction) {
            return res.status(404).json({ message: 'Направление не найдено.' });
        }

        res.status(200).json(direction);
    } catch (error) {
        console.error('Ошибка при получении направления:', error);
        res.status(500).json({ message: 'Ошибка сервера.' });
    }
};
