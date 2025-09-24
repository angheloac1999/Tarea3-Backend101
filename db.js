require('dotenv').config();

const mongoose = require('mongoose');

const DB_URI = `${process.env.DB_URI}`

mongoose.connect(DB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log('Error de conexion',err));

module.exports = mongoose;