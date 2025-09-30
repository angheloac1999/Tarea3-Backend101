const express = require('express');

/** Db */
const mongoose = require('./db');

/** Middlewares */
const performance = require('./middlewares/performance');


/** Controllers */
const health = require('./middlewares/health');
const eventsV1 = require('./controllers/v1/events');
const usersV1 = require('./controllers/v1/users');

//+++++++++++++++++++++++++++++++++++++++++++++//
const app = express();

app.use(express.json());



const PORT = 3030;
/** Controllers */
app.use('/api/v1/events', eventsV1);
app.use('/api/v1/users', usersV1);
app.use('/health', health);



app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});