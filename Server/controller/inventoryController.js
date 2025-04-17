const InventoryItem = require('../models/InventoryItem');

// @desc    Get all inventory items
// @route   GET /api/inventory
// @access  Private
exports.getInventoryItems = async (req, res) => {
  try {
    // Build query based on query parameters
    let query = {};

    // Filter by category if provided
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by name search if provided
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    // Filter by low stock items if requested
    if (req.query.lowStock === 'true') {
      query.quantity = { $lte: '$reorderLevel' };
    }

    // Execute query
    const inventoryItems = await InventoryItem.find(query).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: inventoryItems.length,
      data: inventoryItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single inventory item
// @route   GET /api/inventory/:id
// @access  Private
exports.getInventoryItem = async (req, res) => {
  try {
    const inventoryItem = await InventoryItem.findById(req.params.id);

    if (!inventoryItem) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: inventoryItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new inventory item
// @route   POST /api/inventory
// @access  Private (Admin and Pharmacist only)
exports.createInventoryItem = async (req, res) => {
  try {
    // Add user to req.body
    req.body.updatedBy = req.user.id;

    // Check if item already exists with the same name
    const existingItem = await InventoryItem.findOne({ name: req.body.name });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: 'An item with this name already exists'
      });
    }

    const inventoryItem = await InventoryItem.create(req.body);

    res.status(201).json({
      success: true,
      data: inventoryItem
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update inventory item
// @route   PUT /api/inventory/:id
// @access  Private (Admin and Pharmacist only)
exports.updateInventoryItem = async (req, res) => {
  try {
    let inventoryItem = await InventoryItem.findById(req.params.id);

    if (!inventoryItem) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    // Add updatedBy and updatedAt
    req.body.updatedBy = req.user.id;
    req.body.updatedAt = Date.now();

    // Update inventory item
    inventoryItem = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: inventoryItem
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete inventory item
// @route   DELETE /api/inventory/:id
// @access  Private (Admin only)
exports.deleteInventoryItem = async (req, res) => {
  try {
    const inventoryItem = await InventoryItem.findById(req.params.id);

    if (!inventoryItem) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    await inventoryItem.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};



