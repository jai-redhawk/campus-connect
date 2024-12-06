const express = require('express');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware'); // Import token verification and role checking
const eventController = require('../controllers/eventController');

const router = express.Router();

// Route to create a new event - accessible to FACULTY, CREATOR, and ADMIN only
router.post('/create', verifyToken, verifyRole(['FACULTY', 'CREATOR', 'ADMIN']), eventController.createEvent);

// Route to get all events - accessible to all users
router.get('/', verifyToken, eventController.getAllEvents);

// Route to edit an event - accessible to FACULTY, CREATOR, and ADMIN only
router.put('/edit/:id', verifyToken, verifyRole(['FACULTY', 'CREATOR', 'ADMIN']), eventController.editEvent);

// Route to delete an event - accessible to ADMIN and CREATOR only
router.delete('/delete/:id', verifyToken, verifyRole(['ADMIN', 'CREATOR']), eventController.deleteEvent);

module.exports = router;
