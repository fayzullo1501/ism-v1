const Service = require('../models/serviceModel');

// Контроллер для добавления услуги
exports.addService = async (req, res) => {
    try {
        const { serviceName, serviceType, serviceAbout, servicePrice } = req.body;
        
        const newService = new Service({
            serviceName,
            serviceType,
            serviceAbout,
            servicePrice
            // Поле createdAt автоматически добавится благодаря настройке в модели
        });

        await newService.save();
        res.status(201).json({ message: 'Услуга успешно добавлен', service: newService });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при добавлении услуги', error });
    }
};


// Контроллер для получения всех услуг
exports.getServices = async (req, res) => {
    try {
        // Сортируем по полю createdAt в порядке убывания
        const services = await Service.find().sort({ createdAt: -1 });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении списка услуг', error });
    }
};

// Контроллер для получения услуги по ID
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении услуги', error });
    }
};

// Контроллер для изменения услуги
exports.updateService = async (req, res) => {
    try {
        const { serviceName, serviceType, serviceAbout, servicePrice } = req.body; // Убрали поля service, ward, doctorSummary
        
        const updatedService = await Service.findByIdAndUpdate(req.params.id, {
            serviceName,
            serviceType,
            serviceAbout,
            servicePrice
        }, { new: true }); // new: true для возврата обновленного объекта

        res.status(200).json({ message: 'Пациент успешно изменен', service: updatedService });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при изменении услуги', error });
    }
};

// Контроллер для удаления услуги
exports.deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Пациент удален' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении услуги', error });
    }
};
