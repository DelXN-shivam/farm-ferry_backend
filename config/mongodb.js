const mongoose = require('mongoose');

const connection = mongoose.createConnection("mongodb+srv://abhijeetghodedelxn:rcbQpHCqNXYRCMz1@cluster0.sfsxi.mongodb.net/Farm_Ferry").on('open', () => {
    console.log('Connected to MongoDB');
}).on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
});

module.exports = connection;
