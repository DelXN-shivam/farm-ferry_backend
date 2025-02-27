const router = require('express').Router();
const SupplierController = require('../controller/supplier.controller');

router.post('/registration', SupplierController.register);
router.post('/login', SupplierController.login);

module.exports = router;

