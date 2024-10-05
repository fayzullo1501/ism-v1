const Service = require('../models/serviceModel');

// Контроллер для добавления новой услуги
exports.addService = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newService = new Service({
            name,
            description,
            price
        });

        await newService.save();
        res.status(201).json({ message: 'Услуга успешно добавлена', service: newService });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при добавлении услуги', error });
    }
};

// Контроллер для получения списка услуг
exports.getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении списка услуг', error });
    }
};
