const mongoose = require('mongoose');
const mongodb = require('../config/mongodb');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
});

supplierSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

supplierSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

const Supplier = mongodb.models.Supplier || mongodb.model('Supplier', supplierSchema);
module.exports = Supplier;