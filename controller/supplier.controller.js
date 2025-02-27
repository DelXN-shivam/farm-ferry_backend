const SupplierServices = require('../services/supplier.services');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const supplier = await SupplierServices.registerSupplier(email, password);
        // res.status(200).json(user);
        res.json({ status: true, message: 'Supplier created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const supplier = await SupplierServices.checksupplier(email);
        if (!supplier) {
            return res.status(400).json({ error: 'Supplier not found' });
        }

        const isValidPassword = await supplier.isValidPassword(password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        let tokenData = {
            email: supplier.email,
            _id: supplier._id
        };

        // const token = await UserServices.generateToken(tokenData, process.env.JWT_SECRET, '1h');
        const token = await SupplierServices.generateToken(tokenData, 'secretKey', '1h');

        res.status(200).json({ status: true, token: token });
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};