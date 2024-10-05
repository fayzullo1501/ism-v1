const Ward = require('../models/wardModel');

// Контроллер для добавления новой палаты
exports.addWard = async (req, res) => {
    try {
        const { name, floor, capacity } = req.body;
        const newWard = new Ward({
            name,
            floor,
            capacity
        });

        await newWard.save();
        res.status(201).json({ message: 'Палата успешно добавлена', ward: newWard });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при добавлении палаты', error });
    }
};

// Контроллер для получения списка палат
exports.getWards = async (req, res) => {
    try {
        const wards = await Ward.find();
        res.status(200).json(wards);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении списка палат', error });
    }
};
