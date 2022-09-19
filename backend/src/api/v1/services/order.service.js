const db = require("../models");
const _Order = db.Order;
const _OrderDetails = db.OrderDetails;
const _Product = db.Product;

const orderService = {
  buy: async ({ order }) => {
    const transaction = await db.sequelize.transaction();
    try {
      // Thanh toán 1 lúc nhiều đơn hàng của các shop khác nhau
      console.log("out order");
      order.forEach(async (item) => {
        let newOrder, orderDetail;
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
          orderDetail = await _OrderDetails.create(
            { ...detail },
            { transaction: transaction }
          );

          // await orderService.handleInventory({
          //   productId: detail.productId,
          //   quantity: detail.quantity,
          // });
          console.log("after order details");
        });
      });

      console.log("end out side");

      setTimeout(async () => {
        console.log("setTimeout");
        await transaction.commit();
      }, 1000);

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

  handleInventory: async ({ productId, quantity }) => {
    try {
      let product = await _Product.findByPk(productId);
      console.log(product.toJSON());
      product.unitInStock = product.unitInStock - quantity;
      await _Product.update(
        {
          unitInStock: unitInStock,
        },
        {
          where: { id: productId },
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = orderService;
