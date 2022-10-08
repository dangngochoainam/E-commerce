const bcrypt = require("bcrypt");
const cloudinary = require("../../../config/cloudinary");
const db = require("../models");
const _User = db.User;
const _Customer = db.Customer;
const _Seller = db.Seller;

module.exports = {
  register: async ({ user }) => {
    const transaction = await db.sequelize.transaction();
    try {
      const checkEmail = await _User.findOne({ where: { email: user.email } });
      const checkUsername = await _User.findOne({
        where: { username: user.username },
      });
      if (checkUsername) {
        return {
          code: 400,
          data: {
            status: 400,
            error: "Tên tài khoản đã được sử dụng",
          },
        };
      }
      if (checkEmail) {
        return {
          code: 400,
          data: {
            stats: 400,
            error: "Email đã được sử dụng",
          },
        };
      } else {
        const salt = await bcrypt.genSalt(11);
        const hashed = await bcrypt.hash(user.password, salt);
        const result = await cloudinary.uploader.upload(user.avatar, {
          folder: "Ecommerce",
          resource_type: "auto",
        });

        if (user.roles === "CUSTOMER") {
          user.roles = "CUSTOMER";
        } else if (user.roles === "SELLER") {
          user.roles = "CUSTOMER,SELLER";
        } else user.roles = "";

        const newUser = await _User.create(
          {
            ...user,
            password: hashed,
            avatar: result.secure_url,
          },
          { transaction: transaction }
        );

        if (user.roles.indexOf("CUSTOMER") !== -1) {
          const customer = await _Customer.create(
            { userId: newUser.id },
            { transaction: transaction }
          );
        }
        if (user.roles.indexOf("SELLER") !== -1) {
          const seller = await _Seller.create(
            { type: "Nhà bán lẻ", userId: newUser.id },
            { transaction: transaction }
          );
        }

        await transaction.commit();

        return {
          code: 201,
          data: {
            status: 201,
          },
        };
      }
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return {
        code: 500,
        data: {
          status: 500,
        },
      };
    }
  },
  login: async (username, password) => {
    try {
      const user = await _User.findOne({
        where: {
          username: username,
        },
      });
      if (!user) {
        return {
          code: 404,
          data: {
            error: "Tên tài khoản không tồn tại",
            status: 404,
          },
        };
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return {
          code: 404,
          data: {
            error: "Mật khẩu không đúng",
            status: 404
          },
        };
      }

      if (user && isValidPassword) {
        const { password, isActive, updatedAt, ...orthers } = user.dataValues;
        return {
          code: 200,
          data: {
            status: 200,
            data: orthers,
          }
        };
      }
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
};
