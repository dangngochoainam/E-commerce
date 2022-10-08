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
          data: {
            status: 200,

            user: user,
          },
        };
      }
      return {
        code: 404,
        data: {
          status: 404,
          error: "Người dùng không tồn tại",
        },
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
          data: {
            status: 200,

            user: user,
          },
        };
      }
      return {
        code: 404,
        data: {
          status: 404,
          error: "Người dùng không tồn tại",
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
};
