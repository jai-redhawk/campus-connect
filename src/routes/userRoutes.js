const express = require('express');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware'); // Import role-based verification middleware
const userController = require('../controllers/userController');

const router = express.Router();

// Admin-only route: Access only allowed for admins
router.get('/admin', verifyToken, verifyRole(['ADMIN']), userController.getAdminData);

// Other user routes (as before)
router.get('/profile', verifyToken, userController.getUserProfile);

module.exports = router;
