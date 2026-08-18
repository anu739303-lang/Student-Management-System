const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check token
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }


    // Expected format:
    // Bearer TOKEN

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }


    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    // Store admin information in request
    req.admin = decoded;


    // Continue
    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });

  }
};

module.exports = authMiddleware;