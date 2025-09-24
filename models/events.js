const Event = require('../schemas/events');

const saveEvent = (event, callback) => {
    return Event.saveEvent(event, callback);
}

const getAllEvents = (callback) => {
    return Event.getAllEvents(callback);
}

const getEventById = (id, callback) => {
    return Event.findEventById(id, callback);
}

const updateEvent = (id, event, callback) => {
    return Event.updateEvent(id, event, callback);
}

const deleteEvent = (id, callback) => {
    return Event.deleteEvent(id, callback);
}

module.exports = {
    saveEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
}