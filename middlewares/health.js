const { mongoose } = require('mongoose');

const router = require('express').Router();

router.get('/', (req, res) => {
    const dbState = mongoose.connection.readyState;
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    res.json(
        {
            status: 'OK', 
            uptime: process.uptime(),
            db: states[dbState]
        })
})

module.exports = router;