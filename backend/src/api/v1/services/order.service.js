const db = require("../models");
const productService = require("./product.service");
const _Order = db.Order;
const _OrderDetails = db.OrderDetails;
const _Product = db.Product;

const orderService = {
  // Thanh toán các sản phẩm chỉ thuộc về 1 shop
  buy: async ({ order }) => {
    const transaction = await db.sequelize.transaction();
    try {
      let newOrder;
      let check = true;
      const { orderDetails, ...orthers } = order;

      let items = orderDetails.reduce((acc, item) => {
        acc.push({
          productId: item.productId,
          quantity: item.quantity,
        });
        return acc;
      }, []);

      let productIds = items.reduce(
        (acc, item) => [...acc, item.productId],
        []
      );

      let products = await _Product.findAll({
        where: {
          id: productIds,
        },
      });

      for (let i = 0; i < products.length; i++) {
        if (
          products[i].id === items[i].productId &&
          products[i].unitInStock - items[i].quantity < 0
        ) {
          check = false;
          break;
        }

        products[i].unitInStock -= items[i].quantity;
        products[i].unitOnOrder += items[i].quantity;
      }

      if (!check) throw "The product is out of stock";

      products.forEach(async (product) => {
        await _Product.update(
          {
            unitInStock: product.unitInStock,
            unitOnOrder: product.unitOnOrder,
          },
          {
            where: { id: product.id },
            transaction: transaction,
          }
        );
      });

      orthers.createdAt = new Date();
      orthers.updatedAt = new Date();
      newOrder = await _Order.create(
        {
          ...orthers,
        },
        { transaction: transaction }
      );

      orderDetails.forEach(async (detail) => {
        detail.orderId = newOrder.id;
        await _OrderDetails.create({ ...detail }, { transaction: transaction });
      });

      await _Order.findOne();

      await transaction.commit();
      return {
        code: 200,
      };
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return {
        code: 500,
        error: error,
      };
    }
  },

  // Thanh toán 1 lúc nhiều sản phẩm, các sản phẩm thuộc các shop khác nhau
  // buy: async ({ order }) => {
  //   const transaction = await db.sequelize.transaction();
  //   try {
  //     // Thanh toán 1 lúc nhiều đơn hàng của các shop khác nhau
  //     console.log("out order");
  //     order.forEach(async (item) => {
  //       let newOrder, orderDetail;
  //       const { orderDetails, ...orthers } = item;
  //       orthers.createdAt = new Date();
  //       orthers.updatedAt = new Date();

  //       console.log("before order");
  //       newOrder = await _Order.create(
  //         {
  //           ...orthers,
  //         },
  //         { transaction: transaction }
  //       );
  //       console.log("after order");

  //       orderDetails.forEach(async (detail) => {
  //         console.log("before order details");
  //         detail.orderId = newOrder.id;
  //         orderDetail = await _OrderDetails.create(
  //           { ...detail },
  //           { transaction: transaction }
  //         );

  //         // await orderService.handleInventory({
  //         //   productId: detail.productId,
  //         //   quantity: detail.quantity,
  //         // });

  //         console.log("after order details");
  //       });
  //     });

  //     console.log("end out side");

  //     setTimeout(async () => {
  //       console.log("setTimeout");
  //       await transaction.commit();
  //     }, 1000);

  //     return {
  //       code: 200,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     await transaction.rollback();
  //     return {
  //       code: 500,
  //     };
  //   }
  // },

  confirmOrder: async ({ orderId, orderDetailIds, action }) => {
    const transaction = await db.sequelize.transaction();
    try {
      const checkIsValid = await _Order.findByPk(orderId);

      if (checkIsValid.isConfirm) {
        return {
          code: 400,
          error: "Receipt done successfully",
        };
      }

      const orderDetails = await _OrderDetails.findAll({
        attributes: ["quantity", "productId"],
        where: {
          id: orderDetailIds,
        },
      });
      if (action === "DONE") {
        orderDetails.forEach(async (item) => {
          await orderService.handleInventory({
            productId: item.productId,
            quantity: item.quantity,
            transaction: transaction,
            action: action,
          });
        });

        await _Order.update(
          {
            isConfirm: true,
          },
          {
            where: { id: orderId },
            transaction: transaction,
          }
        );
        await transaction.commit();

        return { code: 200 };
      } else {
        orderDetails.forEach(async (item) => {
          await orderService.handleInventory({
            productId: item.productId,
            quantity: item.quantity,
            transaction: transaction,
            action: action,
          });
        });
        await _Order.destroy(
          { where: { id: orderId } },
          { transaction: transaction }
        );
        await transaction.commit();
        return {
          code: 204,
        };
      }
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return {
        code: 500,
      };
    }
  },

  handleInventory: async ({ productId, quantity, transaction, action }) => {
    let product = await _Product.findByPk(productId);

    if (action === "DONE") {
      product.unitOnOrder -= quantity;
    } else {
      product.unitOnOrder -= quantity;
      product.unitInStock += quantity;
    }
    await _Product.update(
      {
        unitInStock: product.unitInStock,
        unitOnOrder: product.unitOnOrder,
      },
      {
        where: { id: productId },
        transaction: transaction,
      }
    );
    return true;
  },
};

module.exports = orderService;
