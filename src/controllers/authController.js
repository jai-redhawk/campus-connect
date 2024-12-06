const bcrypt = require('bcrypt');
const { PrismaClient, Role } = require('@prisma/client'); // Import PrismaClient and Role enum
const prisma = new PrismaClient(); // Initialize Prisma Client
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Validate role
    if (!Object.values(Role).includes(role.toUpperCase())) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role.toUpperCase(), // Use uppercase for enum value
        isVerified: false,
        idDocumentUrl: null,
      },
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed', details: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create JWT token with role included
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role, // Include the role here
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expiry time
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

module.exports = {
  register,
  login,
};
