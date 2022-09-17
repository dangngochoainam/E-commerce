const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../../../config/cloudinary");
const db = require("../models");
const authController = require('../controllers/auth.controller')
const _User = db.User;

module.exports = {
  register: async ({ user }) => {
    try {
      const checkEmail = await _User.findOne({ where: { email: user.email } });
      const checkUsername = await _User.findOne({
        where: { username: user.username },
      });
      if (checkUsername) {
        return {
          code: 400,
          message: "Username already in use",
        };
      }
      if (checkEmail) {
        return {
          code: 400,
          message: "This email address is already in user",
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
          user.roles = "CUSTOMER, SELLER";
        } else
          return {
            code: 400,
            message: "Invalid role",
          };

        const currentUser = _User.build({
          ...user,
          // username: user.username,
          password: hashed,
          // email: user.email,
          avatar: result.secure_url,
        });

        // Tại sao lại lỗi
        // const newUser = await _User.create({ ...user, password: hashed});
        // Nếu sử dụng create thì thêm thẳng các thuộc tính vào chứ không cần tạo 1 đối tượng để giữ giá trị đó
        const newUser = await currentUser.save();
        return {
          code: 201,
          result: newUser,
        };
      }
    } catch (error) {
      console.log(error);
      console.log("Error in user.servicer.js");
      return {
        code: 404,
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
          code: 400,
          message: "Username not found",
        };
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return {
          code: 400,
          message: "Password not found",
        };
      }

      if (user && isValidPassword) {

        const { password, isActive, updatedAt, ...orthers } = user.dataValues;
        return {
          code: 200,
          user: orthers
        }
      }
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        message: error
      }
    }
  },
};
