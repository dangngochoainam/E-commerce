const db = require("../models");
const { QueryTypes } = require("sequelize");

const statsShop = {
  // Thống kê doanh thu các sản phẩm của shop
  revenueStats: async ({
    shopId,
    type,
    categoryId,
    name,
    month,
    quater,
    year,
    date,
  }) => {
    let stats, fromMonth, toMonth;

    switch (quater) {
      case 1:
        fromMonth = 1;
        toMonth = 3;
        break;
      case 2:
        fromMonth = 4;
        toMonth = 6;
        break;
      case 3:
        fromMonth = 7;
        toMonth = 9;
        break;
      case 4:
        fromMonth = 10;
        toMonth = 12;
        break;

      default:
        quater = 0;
        break;
    }
    try {
      if (type === "PRODUCT") {
        stats = await statsShop.statsByProduct(
          shopId,
          name,
          month,
          quater,
          fromMonth,
          toMonth,
          year,
          date
        );

        // stats = await db.sequelize.query(
        //   `select p.id, p.name, sum(d.quantity * d.unitPrice) as 'Doanh thu'
        //   from ecommerce_db.order_details as d, ecommerce_db.product as p, ecommerce_db.order as o
        //   where d.productId = p.id and o.id = d.orderId and p.shopId = :shopId and p.name like '%${name}%' ${
        //     month > 0 && month < 13 ? "and MONTH(o.createdAt) = :month" : ""
        //   } ${
        //     quater !== 0
        //       ? "and MONTH(o.createdAt) BETWEEN :fromMonth AND :toMonth"
        //       : ""
        //   } ${year > 0 ? "and YEAR(o.createdAt) = :year" : ""} ${
        //     date ? "and DATE(o.createdAt) = DATE(:date)" : ""
        //   }
        //   group by p.id
        //   order by sum(d.quantity * d.unitPrice) desc`,
        //   {
        //     replacements: {
        //       shopId: shopId,
        //       month: month,
        //       fromMonth: fromMonth,
        //       toMonth: toMonth,
        //       year: year,
        //       date: date,
        //     },
        //     type: QueryTypes.SELECT,
        //   }
        // );
      } else if (type === "CATEGORY") {
        stats = await statsShop.statsByCategory(
          shopId,
          categoryId,
          month,
          quater,
          fromMonth,
          toMonth,
          year,
          date
        );
        // stats = await db.sequelize.query(
        //   `select c.id, c.name, sum(d.quantity * d.unitPrice) as 'Doanh thu'
        //   from ecommerce_db.order_details as d, ecommerce_db.product as p, ecommerce_db.order as o, ecommerce_db.category c
        //   where d.productId = p.id and o.id = d.orderId and c.id = p.categoryId and p.shopId = :shopId ${
        //     categoryId > 0 ? "and p.categoryId = :categoryId" : ""
        //   } and p.name like '%${name}%' ${
        //     month > 0 && month < 13 ? "and MONTH(o.createdAt) = :month" : ""
        //   } ${
        //     quater !== 0
        //       ? "and MONTH(o.createdAt) BETWEEN :fromMonth AND :toMonth"
        //       : ""
        //   } ${year > 0 ? "and YEAR(o.createdAt) = :year" : ""} ${
        //     date ? "and DATE(o.createdAt) = DATE(:date)" : ""
        //   }
        //   group by c.id
        //   order by sum(d.quantity * d.unitPrice) desc`,

        //   {
        //     replacements: {
        //       shopId: shopId,
        //       categoryId: categoryId,
        //       month: month,
        //       fromMonth: fromMonth,
        //       toMonth: toMonth,
        //       year: year,
        //       date: date,
        //     },
        //     type: QueryTypes.SELECT,
        //   }
        // );
      }

      return {
        code: 200,
        data: {
          status: 200,

          data: stats,
        }
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  statsByProduct: async (
    shopId,
    name,
    month,
    quater,
    fromMonth,
    toMonth,
    year,
    date
  ) => {
    try {
      const stats = await db.sequelize.query(
        `select p.id, p.name, sum(d.quantity * d.unitPrice) as 'Doanh thu'
        from ecommerce_db.order_details as d, ecommerce_db.product as p, ecommerce_db.order as o 
        where d.productId = p.id and o.id = d.orderId and p.shopId = :shopId and p.name like '%${name}%' ${
          month > 0 && month < 13 ? "and MONTH(o.createdAt) = :month" : ""
        } ${
          quater !== 0
            ? "and MONTH(o.createdAt) BETWEEN :fromMonth AND :toMonth"
            : ""
        } ${year > 0 ? "and YEAR(o.createdAt) = :year" : ""} ${
          date ? "and DATE(o.createdAt) = DATE(:date)" : ""
        }
        group by p.id
        order by sum(d.quantity * d.unitPrice) desc`,
        {
          replacements: {
            shopId: shopId,
            month: month,
            fromMonth: fromMonth,
            toMonth: toMonth,
            year: year,
            date: date,
          },
          type: QueryTypes.SELECT,
        }
      );
      return stats;
    } catch (error) {
      console.log(error);
    }
  },

  statsByCategory: async (
    shopId,
    categoryId,
    month,
    quater,
    fromMonth,
    toMonth,
    year,
    date
  ) => {
    try {
      const stats = await db.sequelize.query(
        `select c.id, c.name, sum(d.quantity * d.unitPrice) as 'Doanh thu'
        from ecommerce_db.order_details as d, ecommerce_db.product as p, ecommerce_db.order as o, ecommerce_db.category c
        where d.productId = p.id and o.id = d.orderId and c.id = p.categoryId and p.shopId = :shopId ${
          categoryId > 0 ? "and p.categoryId = :categoryId" : ""
        } ${month > 0 && month < 13 ? "and MONTH(o.createdAt) = :month" : ""} ${
          quater !== 0
            ? "and MONTH(o.createdAt) BETWEEN :fromMonth AND :toMonth"
            : ""
        } ${year > 0 ? "and YEAR(o.createdAt) = :year" : ""} ${
          date ? "and DATE(o.createdAt) = DATE(:date)" : ""
        }
        group by c.id
        order by sum(d.quantity * d.unitPrice) desc`,

        {
          replacements: {
            shopId: shopId,
            categoryId: categoryId,
            month: month,
            fromMonth: fromMonth,
            toMonth: toMonth,
            year: year,
            date: date,
          },
          type: QueryTypes.SELECT,
        }
      );
      return stats;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = statsShop;
