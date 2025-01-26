const History = require('../models/historyModel');

exports.addHistoryFromDirection = async (direction) => {
    try {
        const historyData = {
            patientId: direction.patientId,
            serviceName: direction.serviceName,
            serviceType: direction.serviceType,
            doctorName: direction.doctorName,
            roomNumber: direction.roomNumber,
            wardType: direction.wardType,
            wardNumber: direction.wardNumber,
            wardDays: direction.wardDays,
            wardCapacity: direction.wardCapacity,
            totalPrice: direction.totalPrice,
            result: 'Нет данных' // Укажите значение по умолчанию или передайте реальное значение
        };

        const newHistory = new History(historyData);
        await newHistory.save();
    } catch (error) {
        console.error('Ошибка при создании истории пациента:', error);
        throw error;
    }
};
