const db = require("../models");
const _Customer = db.Customer;

module.exports = {
  getCustomerByUserId: async (userId) => {
    try {
      const customer = await _Customer.findOne({ where: { userId: userId } });
      if (customer)
        return {
          code: 200,
          data: {
            status: 200,

            data: customer,
          },
        };
      return {
        code: 404,
        data: {
          error: "Khách hàng không tồn tại",
          status: 404,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  // Từ khách hàng đăng ký thành người bán
  registerSeller: async (userId) => {
    try {

    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
};
