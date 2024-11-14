const Ward = require('../models/wardModel');

// Контроллер для добавления палаты
exports.addWard = async (req, res) => {
    try {
        const { wardNumber, wardType, wardCapacity, wardPrice } = req.body;

        const newWard = new Ward({
            wardNumber,
            wardType,
            wardCapacity,
            wardPrice
        });

        await newWard.save();
        res.status(201).json({ message: 'Палата успешно добавлена', ward: newWard });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при добавлении палаты', error });
    }
};

// Контроллер для получения всех палат
exports.getWards = async (req, res) => {
    try {
        const wards = await Ward.find().sort({ createdAt: -1 });
        res.status(200).json(wards);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении списка палат', error });
    }
};

// Контроллер для получения палаты по ID
exports.getWardById = async (req, res) => {
    try {
        const ward = await Ward.findById(req.params.id);
        if (!ward) {
            return res.status(404).json({ message: 'Палата не найдена' });
        }
        res.status(200).json(ward);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении палаты', error });
    }
};

// Контроллер для изменения палаты
exports.updateWard = async (req, res) => {
    try {
        const { wardNumber, wardType, wardCapacity, wardPrice } = req.body;

        const updatedWard = await Ward.findByIdAndUpdate(req.params.id, {
            wardNumber,
            wardType,
            wardCapacity,
            wardPrice
        }, { new: true });

        if (!updatedWard) {
            return res.status(404).json({ message: 'Палата не найдена' });
        }

        res.status(200).json({ message: 'Палата успешно изменена', ward: updatedWard });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при изменении палаты', error });
    }
};

// Контроллер для удаления палаты
exports.deleteWard = async (req, res) => {
    try {
        const deletedWard = await Ward.findByIdAndDelete(req.params.id);
        if (!deletedWard) {
            return res.status(404).json({ message: 'Палата не найдена' });
        }
        res.status(200).json({ message: 'Палата удалена' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении палаты', error });
    }
};
