const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
name: {
    type: String,
    required: [true, 'Please add a name']
  },
  age: {
    type: Number,
    required: [true, 'Please add age']
  },
  gender: {
    type: String,
    required: [true, 'Please add gender'],
    enum: ['Male', 'Female', 'Other']
  },
  bloodGroup: {
    type: String
  },
  contactNumber: {
    type: String,
    required: [true, 'Please add contact number']
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  address: {
    type: String,
    required: [true, 'Please add address']
  },
  medicalHistory: [{
    condition: String,
    diagnosed: Date,
    treatment: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Patient', PatientSchema);
