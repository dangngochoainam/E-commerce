const staffService = require("../services/staff.service");

module.exports = {
  grantRole: async (req, res) => {
    try {
      const { sellerId } = req.body;

      const { code } = await staffService.grantRole(sellerId);

      return res.status(code).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  
};
