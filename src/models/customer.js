const mongoose = require('mongoose');

// Define an embedded address schema
const addressSchema = new mongoose.Schema({
  street:     { type: String, trim: true },
  city:       { type: String, trim: true },
  state:      { type: String, trim: true },
  postalCode: { type: String, trim: true },
  country:    { type: String, trim: true }
}, { _id: false });

// Define the customer schema
const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  // Embedding the address document
  address: addressSchema
}, {
  // Automatically add createdAt and updatedAt fields
  timestamps: true
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);
export default Customer;
