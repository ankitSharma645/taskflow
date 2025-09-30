const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  deleteAccount
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

router.route('/profile')
  .get(getProfile)
  .put(updateProfile)
  .delete(deleteAccount);

module.exports = router;