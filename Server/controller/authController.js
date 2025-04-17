const User = require('../model/User');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { firebaseUID, email, name, role, phone, profilePicture } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ firebaseUID });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already registered'
      });
    }

    // Create new user
    const user = new User({
      firebaseUID,
      email,
      name,
      role,
      phone,
      profilePicture
    });

    await user.save();

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting user data',
      error: error.message
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, profilePicture } = req.body;

    const user = await User.findById(req.user._id);
    
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// Update user role (admin only)
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!role) {
      return res.status(400).json({
        success: false,
        message: 'Role is required'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user role',
      error: error.message
    });
  }
};

// Update user status (admin only)
exports.updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user status',
      error: error.message
    });
  }
};