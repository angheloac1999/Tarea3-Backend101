const router = require('express').Router();
const { query, validationResult } = require('express-validator');

/** MODELS **/
const Events = require('../../models/events');

const jwtAuthMiddleware = require('../../middlewares/jwtAuth');

router.use(jwtAuthMiddleware);


// Entity: Events
router.get('/', (req, res) => {
    return Events.getAllEvents((err, events) => {
        if (err) {
            return res.status(500).json({code: 'ER', message: 'Error al obtener los eventos'})
        }
        res.status(200).json({code: 'OK', message: 'Eventos disponibles!', data: { events }})
    })
})

router.get('/:id', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ code: 'PF', message: 'Se requiere ID del Evento!'});
    }
    const id = req.params.id;
    return Events.getEventById(id, (err, event) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error al obtener el evento!'});
        }
        if(!event) {
            return res.status(404).json({ code: 'NF', message: 'Evento no encontrado!'});
        }
        res.status(200).json({ code: 'OK', message: 'Evento disponible!', data:{ event }});
    });
});

router.post('/', (req, res) => {
    console.log('POST /eventos: ',req.body);
    const { name, description, amount, date, type } = req.body;

    const newEvent = { name, description, amount, date, type};

    return Events.saveEvent(newEvent, (err, event) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error al crear Evento!'});
        }
        res.status(201).json({ code: 'OK', message: 'Evento creado exitosamente!', data: { event }});
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    if (!req.body) {
        return res.status(400).json({ code: 'NF', message: 'No existen datos para actualizar!'});
    }
    const updateEvent = req.body;
    return Events.updateEvent(id, updateEvent, (err, event) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error al actualizar Evento!'});
        }
        res.status(201).json({ code: 'OK', message: 'Evento actualizado exitosamente!', data: { event }});
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ code: 'NF', message: 'ID necesario!'});
    }
    return Events.deleteEvent(id, (err, event) => {
        if(err){
            return res.status(500).json({ code: 'ER', message: 'Error al eliminar Evento!'});
        }
        res.status(201).json({ code: 'OK', message: 'Evento eliminado exitosamente!', data: { event }});
    });
});

module.exports = router;