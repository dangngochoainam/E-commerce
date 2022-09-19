const db = require("../models");
const _Order = db.Order;
const _OrderDetails = db.OrderDetails;

module.exports = {
  buy: async ({ order }) => {
    const transaction = await db.sequelize.transaction();
    try {
      // Thanh toán 1 lúc nhiều đơn hàng của các shop khác nhau
      console.log("out order");
      order.forEach(async (item) => {
        let newOrder;
        const { orderDetails, ...orthers } = item;
        orthers.createdAt = new Date();
        orthers.updatedAt = new Date();

        console.log("before order");
        newOrder = await _Order.create(
          {
            ...orthers,
          },
          { transaction: transaction }
        );
        console.log("after order");

        orderDetails.forEach(async (detail) => {
          console.log("before order details");
          detail.orderId = newOrder.id;
          await _OrderDetails.create(
            { ...detail },
            { transaction: transaction }
          );
          console.log("after order details");
        });
      });

      setTimeout(async () => await transaction.commit(), 2000);

      return {
        code: 200,
      };
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return {
        code: 500,
      };
    }
  },
};
