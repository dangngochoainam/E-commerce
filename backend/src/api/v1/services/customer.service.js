const db = require("../models");
const _Customer = db.Customer;

module.exports = {
  getCustomerByUserId: async (userId) => {
    try {
      const customer = await _Customer.findOne({ where: { userId: userId } });
      if (customer)
        return {
          code: 200,
          data: customer,
        };
      return {
        code: 404,
        message: "Customer not found",
        data: null,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
};
