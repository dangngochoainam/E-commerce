const db = require("../models");
const _User = db.User;

module.exports = {
  getUserByUserName: async (username) => {
    try {
      const user = await _User.findOne({
        where: {
          username: username,
        },
      });
      if (user) {
        return {
          code: 200,
          user: user,
        };
      }
      return {
        code: 404,
        message: "Username not found",
        user: null,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  getUserByID: async (id) => {
    try {
      const user = await _User.findByPk(id);
      console.log;
      if (user) {
        return {
          code: 200,
          user: user,
        };
      }
      return {
        code: 404,
        message: "User not found",
        user: null,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
};
