const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

    // EJEMPLO
    // {
    //     id: 1,
    //     name: 'Salario',
    //     description: 'Salario mensual',
    //     amount: 900,
    //     date: Date.now(),
    //     type: 'income'
    // }

const eventSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: false
    },
    name: {
        type: String,
        unique: false,
        required: true
    },
    description: {
        type: String,
        unique: false,
        required: false
    },
    amount: {
        type: Number,
        unique: false,
        required: true
    },
    date: {
        type: Date,
        unique: false,
        required: true
    },
    type: {
        type: String,
        enum: ['Ingreso','Gasto'],
        unique: false,
        required: true
    }
})

const Event = mongoose.model('Event', eventSchema);

const saveEvent = (event, callback) => {
    const { name, description, amount, date, type } = event;
    const newEvent = new Event({ name, description, amount, date, type});
    newEvent.save()
    .then(() => {
        console.log('Evento creado!');
        return callback(null, newEvent);
    })
    .catch(err => {
        console.error(err);
        return callback(err);
    })
}

const getAllEvents = (callback) => {
    Event.find()
    .then(results => {
        console.log('Todos los eventos: ', results);
        return callback(null, results);
    })
    .catch(err => {
        console.error(err);
        return callback(err);
    })
}

const findEventById = (id, callback) => {
    Event.findOne({ id })
    .then(result => {
        console.log('Evento encontrado: ', result);
        return callback(null, result)
    })
    .catch(err => {
        console.error(err);
        return callback(err);
    })
}

const updateEvent = (id, event, callback) => {
    Event.findOneAndUpdate({ id }, event, {new: true})
    .then(result => {
        console.log('Evento actualizado: ', result);
        return callback(null, result)
    })
    .catch(err => {
        console.log(err);
        return callback(err);
    });
}

const deleteEvent = (id, callback) => {
    Event.findOneAndDelete({ id }, {requireFilter: false})
    .then(result => {
        console.log('Evento eliminado: ', result);
        return callback(null, result)
    })
    .catch(err => {
        console.log(err);
        return callback(err);
    });
}

module.exports = {
    saveEvent,
    getAllEvents,
    findEventById,
    updateEvent,
    deleteEvent
}