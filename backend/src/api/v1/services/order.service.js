const db = require("../models");
const _Order = db.Order;
const _OrderDetails = db.OrderDetails;

module.exports = {
  buy: async ({ order }) => {
    // const transaction = await db.sequelize.transaction();
    console.log(order)
    try {
      order.forEach(async (item) => {
        const { orderDetails, ...orthers } = item;
        console.log(orthers);
        console.log("--------------");
        console.log(orderDetails);
        // await _Order.create(
        //   {
        //     ...orthers,
        //   },
        //   { transaction: transaction }
        // );

        // orderDetails.forEach(async (detail) => {
        //   await _OrderDetail.create(
        //     { ...detail },
        //     { transaction: transaction }
        //   );
        // });
      });

    //   transaction.commit();

      return {
        code: 200,
      };
    } catch (error) {
      console.log(error);
      transaction.rollback();
      return {
        code: 500,
      };
    }
  },
};
