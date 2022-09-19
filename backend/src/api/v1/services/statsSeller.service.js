const db = require("../models");

module.exports = {
  // Thống kê doanh thu các sản phẩm của shop
  revenueStats: async ({ shopId, name, month, quater, year, date }) => {
    try {
        
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
};
