const express = require('express');
const { 
  getInventoryItems, 
  getInventoryItem, 
  createInventoryItem, 
  updateInventoryItem, 
  deleteInventoryItem 
} = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getInventoryItems)
  .post(protect, authorize('admin', 'pharmacist'), createInventoryItem);

router.route('/:id')
  .get(protect, getInventoryItem)
  .put(protect, authorize('admin', 'pharmacist'), updateInventoryItem)
  .delete(protect, authorize('admin'), deleteInventoryItem);