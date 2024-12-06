const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the Bearer token

  if (!token) {
    return res.status(401).json({ error: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    req.user = decoded; // Attach user information to the request object
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};


// Middleware to check if the user has a specific role
const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied. Insufficient role.' });
    }
    next();
  };
};

module.exports = { verifyToken, verifyRole };
