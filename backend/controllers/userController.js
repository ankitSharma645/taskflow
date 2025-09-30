const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, bio, avatar } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
    }

    // Update fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio !== undefined ? bio : user.bio;
    user.avatar = avatar || user.avatar;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete user account
// @route   DELETE /api/v1/users/profile
// @access  Private
exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};