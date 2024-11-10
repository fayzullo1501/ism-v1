const Doctor = require('../models/doctorModel');
const Service = require('../models/serviceModel'); // Импорт модели услуг

// Добавление врача
exports.addDoctor = async (req, res) => {
    try {
        const { fullName, specialty, room, passport, phone, address } = req.body;
        
        const newDoctor = new Doctor({
            fullName,
            specialty,
            room,
            passport,
            phone,
            address
        });

        await newDoctor.save();
        res.status(201).json({ message: 'Врач успешно добавлен', doctor: newDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при добавлении врача', error });
    }
};

// Получение списка врачей
exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().sort({ createdAt: -1 });
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении списка врачей', error });
    }
};

// Получение списка специальностей (услуг)
exports.getSpecialties = async (req, res) => {
    try {
        const specialties = await Service.find().select('serviceName'); // Получаем только названия услуг
        res.status(200).json(specialties);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении списка специальностей', error });
    }
};

// Получение врача по ID
exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Врач не найден' });
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении данных врача', error });
    }
};

// Обновление данных врача
exports.updateDoctor = async (req, res) => {
    try {
        const { fullName, specialty, room, passport, phone, address } = req.body;
        
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, {
            fullName,
            specialty,
            room,
            passport,
            phone,
            address
        }, { new: true });

        if (!updatedDoctor) return res.status(404).json({ message: 'Врач не найден' });

        res.status(200).json({ message: 'Данные врача успешно обновлены', doctor: updatedDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении данных врача', error });
    }
};

// Удаление врача
exports.deleteDoctor = async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) return res.status(404).json({ message: 'Врач не найден' });
        res.status(200).json({ message: 'Врач удален' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении врача', error });
    }
};
