const db = require("../models");
const _Staff = db.Staff;
const _Seller = db.Seller;

module.exports = {
  getStaffByUserId: async (userId) => {
    try {
      const staff = await _Staff.findOne({ where: { userId: userId } });
      if (staff)
        return {
          code: 200,
          data: staff,
        };
      return {
        code: 404,
        message: "Staff not found",
        data: null,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  grantRole: async (sellerId) => {
    try {
      const seller = await _Seller.update(
        { isConfirm: true },
        {
          where: {
            id: sellerId,
          },
        }
      );

      if (seller)
        return {
          code: 200,
        };

      return {
        code: 400,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
};
