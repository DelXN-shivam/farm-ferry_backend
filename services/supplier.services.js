const Supplier = require('../model/supplier.model');
const jwt = require('jsonwebtoken');

class SupplierServices {
    static async registerSupplier(email, password) {
        // Register user
        try {
            const createSupplier = new Supplier({
                email,
                password
            });
            return await createSupplier.save();
        } catch (error) {
            throw error;
        }
    }

    static async checksupplier(email) {
        try {
            return await Supplier.findOne({ email });
        } catch (error) {
            throw error;
            
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire){
        return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
    }
}

module.exports = SupplierServices;