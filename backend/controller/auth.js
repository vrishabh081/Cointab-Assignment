const UserModel = require("../model/auth");
const jwt = require("jsonwebtoken");

// signup-
const signup = async (req, res) =>{
    const payload = req.body;
    const {email, password} = req.body;
    try{
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(401).json({error: "User is already register with this email"});
        }
        else{
            const userData = new UserModel(payload);
            await userData.save();
            return res.status(201).json({message: "Successfully registered"});
        }
    }
    catch(err){
        return res.status(401).json({error: "OOP's something is wrong"});
    }
}

// login-
const login =  async (req, res) => {
    try{
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      
      if (!user || user.password !== password) {
        // Incorrect email or password-
        if (user) {
          user.loginAttempts++;
          user.lastLoginAttemptAt = new Date();
          await user.save();
        }
        return res.status(401).json({ error: 'Incorrect email or password' });
      }
      
      // Login successful-
      user.loginAttempts = 0;
      user.lastLoginAttemptAt = null;
      user.blockedUntil = null;

      // json web token-
      const token = jwt.sign(password, "cointab");

      await user.save();
      return res.json({ message: 'Login successful', token, email });
    }
    catch(error){
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  

  module.exports = {login, signup};