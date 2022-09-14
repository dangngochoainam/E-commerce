const { registerUser } = require("../services/user.service");


module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const user = req.body;    
      user.avatar = req.file.path;
      const newUser = await registerUser({user});
      const { code, result, message } = newUser;
      return res.status(code).json({ result, message });
    } catch (error) {
      console.error(error);
      next();
    }
  },
};
