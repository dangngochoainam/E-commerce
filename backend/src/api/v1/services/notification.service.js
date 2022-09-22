const db = require("../models");
const _Notification = db.Notification;
const _Product = db.Product;
const _Order = db.Order;
const _SubComment = db.SubComment;

module.exports = {
  create: async ({ type, content, valueId, creatorId }) => {
    let notification, sourceUserId;
    try {
      let shop, seller, product;
      switch (type) {
        case "PRODUCT":
          product = await _Product.findByPk(valueId);
          shop = await product.getShop();
          seller = await shop.getSeller();
          sourceUserId = seller.userId;

          notification = {
            content,
            type,
            valueId,
            createdAt: new Date(),
            updatedAt: new Date(),
            sourceUserId,
            creatorId,
          };
          notification = await _Notification.create({ ...notification });
          break;

        case "ORDER":
          const order = await _Order.findByPk(valueId);
          shop = await order.getShop();
          seller = await shop.getSeller();
          sourceUserId = seller.userId;

          notification = {
            content,
            type,
            valueId,
            createdAt: new Date(),
            updatedAt: new Date(),
            sourceUserId,
            creatorId,
          };

          notification = await _Notification.create({ ...notification });
          break;
        case "SUBCOMMET":
          const subComment = await _SubComment.findByPk(valueId);
          let comment = await subComment.getComment();
          product = await comment.getProduct();
          shop = await product.getShop();
          seller = await shop.getSeller();
          sourceUserId = seller.userId;

          notification = {
            content,
            type,
            valueId,
            createdAt: new Date(),
            updatedAt: new Date(),
            sourceUserId,
            creatorId,
          };

          notification = await _Notification.create({ ...notification });
          break;

        default:
          notification = null;
          break;
      }

      return {
        code: 200,
        data: notification,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  getNotificationByUserId: async ({ userId }) => {
    try {
      const notifications = await _Notification.findAll({
        where: {
          sourceUserId: userId,
        },
      });
      return {
        code: 200,
        data: notifications,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
};
