const express = require('express');
const { 
  getDoctors, 
  getDoctor, 
  createDoctor, 
  updateDoctor, 
  deleteDoctor 
} = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getDoctors)
  .post(protect, authorize('admin'), createDoctor);

router.route('/:id')
  .get(protect, getDoctor)
  .put(protect, updateDoctor) // Authorization is handled in the controller
  .delete(protect, authorize('admin'), deleteDoctor);

module.exports = router;