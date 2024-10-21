const Patient = require('../models/patientModel');

// Контроллер для добавления пациента
exports.addPatient = async (req, res) => {
    try {
        const { fullName, birthDate, passport, phone, address } = req.body;
        
        const newPatient = new Patient({
            fullName,
            birthDate,
            passport,
            phone,
            address
            // Поле createdAt автоматически добавится благодаря настройке в модели
        });

        await newPatient.save();
        res.status(201).json({ message: 'Пациент успешно добавлен', patient: newPatient });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при добавлении пациента', error });
    }
};


// Контроллер для получения всех пациентов
exports.getPatients = async (req, res) => {
    try {
        // Сортируем по полю createdAt в порядке убывания
        const patients = await Patient.find().sort({ createdAt: -1 });
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении списка пациентов', error });
    }
};

// Контроллер для получения пациента по ID
exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении пациента', error });
    }
};

// Контроллер для изменения пациента
exports.updatePatient = async (req, res) => {
    try {
        const { fullName, birthDate, passport, phone, address } = req.body; // Убрали поля service, ward, doctorSummary
        
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, {
            fullName,
            birthDate,
            passport,
            phone,
            address
        }, { new: true }); // new: true для возврата обновленного объекта

        res.status(200).json({ message: 'Пациент успешно изменен', patient: updatedPatient });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при изменении пациента', error });
    }
};

// Контроллер для удаления пациента
exports.deletePatient = async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Пациент удален' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении пациента', error });
    }
};
