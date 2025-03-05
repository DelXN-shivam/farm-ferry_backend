import mongoose from 'mongoose';

const mongoose = require('mongoose');

const superAdminSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    required: true,
    unique: true
  },
  permissions: {
    type: [String],
    default: ['manage_vendors', 'manage_categories', 'platform_settings']
  },
  lastLogin: Date,
  activityLog: [{
    action: String,
    timestamp: Date
  }]
}, { timestamps: true });


const SuperAdmin = mongoose.models.SuperAdmin || mongoose.model('SuperAdmin', superAdminSchema);
export default SuperAdmin;