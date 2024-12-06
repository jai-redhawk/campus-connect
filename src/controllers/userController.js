const prisma = require('../config/db');

// Controller: Fetch authenticated user's profile
const getUserProfile = async (req, res) => {
  try {
    // Extract `userId` from the authenticated request (added by middleware)
    const { id: userId } = req.user;

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
      },
    });

    // If user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with user data
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'An error occurred while fetching the profile' });
  }
};

// Controller: Fetch admin-specific data
const getAdminData = async (req, res) => {
  try {
    // Fetch some data relevant to admins (you can adjust this as per your needs)
    const users = await prisma.user.findMany({
      where: { role: 'STUDENT' }, // Example: Fetch all students
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // Respond with admin-relevant data
    res.status(200).json({
      success: true,
      message: 'Admin data fetched successfully',
      data: users,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'An error occurred while fetching admin data' });
  }
};

module.exports = {
  getAdminData,
  getUserProfile, // Ensure existing exports are not affected
};


