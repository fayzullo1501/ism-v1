const Doctor = require('../models/doctorModel');

// Контроллер для добавления врача
exports.addDoctor = async (req, res) => {
    try {
        const { fullName, specialty, room, phone, address, passport, birthDate } = req.body;
        
        const newDoctor = new Doctor({
            fullName,
            specialty,
            room,
            phone,
            address,
            passport,
            birthDate
            // Поле createdAt автоматически добавится благодаря настройке в модели
        });

        await newDoctor.save();
        res.status(201).json({ message: 'Врач успешно добавлен', doctor: newDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при добавлении врача', error });
    }
};

// Контроллер для получения всех врачей
exports.getDoctors = async (req, res) => {
    try {
        // Сортируем по полю createdAt в порядке убывания
        const doctors = await Doctor.find().sort({ createdAt: -1 });
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении списка врачей', error });
    }
};

// Контроллер для получения врача по ID
exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Врач не найден' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении врача', error });
    }
};

// Контроллер для изменения врача
exports.updateDoctor = async (req, res) => {
    try {
        const { fullName, specialty, room, phone, address, passport, birthDate } = req.body;

        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, {
            fullName,
            specialty,
            room,
            phone,
            address,
            passport,
            birthDate
        }, { new: true }); // new: true для возврата обновленного объекта

        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Врач не найден' });
        }

        res.status(200).json({ message: 'Врач успешно изменен', doctor: updatedDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при изменении врача', error });
    }
};

// Контроллер для удаления врача
exports.deleteDoctor = async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) {
            return res.status(404).json({ message: 'Врач не найден' });
        }
        res.status(200).json({ message: 'Врач удален' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении врача', error });
    }
};