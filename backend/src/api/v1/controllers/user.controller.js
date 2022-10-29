const userService = require("../services/user.service");
module.exports = {
  getUserByID: async (req, res) => {
    try {
      const { code, data } = await userService.getUserByID(req.params.id);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
  getUserByProductID: async (req, res) => {
    try {
      const { code, data } = await userService.getUserByProductId(req.params.productID);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
  getUserByShopID: async (req, res) => {
    try {
      const { code, data } = await userService.getUserIDByShopID(
        req.body.shopId
      );
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(code).json();
    }
  },
  registerSeller: async (req, res) => {
    try {
      const { code, data } = await userService.registerSeller(
        req.params.userId
      );
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
};
