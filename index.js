const express = require('express');
const { query, validationResult } = require('express-validator');
const uuid = require('uuid');
const { de, da } = require('zod/v4/locales');

const app = express();

app.use(express.json());

const PORT = 3030;

let events = [{
    id: 1,
    name: 'Salario',
    description: 'Salario mensual',
    amount: 900,
    date: Date.now(),
    type: 'income'
}]

app.post('/api/events/', (req, res) => {
    const { name, description, amount, date, type } = req.body;
    events.push({
        id: events.length + 1 , name, description, amount, date, type
    })
    res.json({code: 'OK', message: 'Event created successfully', data: {events}})
})

app.get('/api/events', (req, res) => {
    res.json({code: 'OK', message: 'Events are available', data: {events}})
})

app.get('/api/events/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.params.id);
    const result = validationResult(req);
    console.log(result)
    if (!result.isEmpty()) {
        return res.status(400).json({code:'PF', message: result.array()[0].msg})
    }
    const event = events.find(event => event.id == id);
    if (event) {
        res.json({ code: 'OK', message: 'User found!', data: { event } });
    } else {
        res.status(404).json({ code: 'PF', message: 'Event not found!' });
    }
});

app.put('/api/events/:id', (req,res) => {
    const id = req.params.id;
    const event = events.find(event => event.id == id);
    if (event) {
        const { name, description, amount, date, type } = req.body;
        event.name = name;
        event.description = description;
        event.amount = amount;
        event.date = date;
        event.type = type;
        res.json({code:'OK', message: 'Event updated succesfully!', data: {event}})
        return;
    }
    res.json({code: 'NF', message: 'Event not found!'});
})

app.delete('/api/events/:id', (req, res) => {
    const id = req.params.id;
    const event = events.find(event => event.id == id);
    if (event) {
        events = events.filter(event => event.id != id);
        return res.json({ code: 'OK', message: 'Event deleted!', data: { event }})
    }
    res.json({ code: 'PF', message: 'Event not found!'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

