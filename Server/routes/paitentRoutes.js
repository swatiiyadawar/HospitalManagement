const express = require('express');
const { 
  getPatients, 
  getPatient, 
  createPatient, 
  updatePatient, 
  deletePatient 
} = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getPatients)
  .post(protect, createPatient);

router.route('/:id')
  .get(protect, getPatient)
  .put(protect, updatePatient)
  .delete(protect, authorize('admin'), deletePatient);