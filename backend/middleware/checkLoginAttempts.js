const UserModel = require("../model/auth");

// variables-
const MAX_LOGIN_ATTEMPTS = 5;
const BLOCK_TIME = 24 * 60 * 60 * 1000;

// check login attempts-
const checkLoginAttempts = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    
    if (user && user.blockedUntil && user.blockedUntil > new Date()) {
      // user is blocked-
      const timeRemaining = Math.ceil((user.blockedUntil - new Date()) / 1000 / 60);
      return res.status(429).json({ error: `Too many login attempts. Please try again in ${timeRemaining} minutes.` });
    }
    
    if (user && user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      // user has exceeded maximum login attempts-
      user.blockedUntil = new Date(Date.now() + BLOCK_TIME);
      await user.save();
      return res.status(429).json({ error: `Too many login attempts. Please try again in 24 hours.` });
    }
    
    next();
  }  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = checkLoginAttempts;