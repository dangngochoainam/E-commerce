const notificationService = require("../services/notification.service");

module.exports = {
  create: async (req, res) => {
    let params = req.body;
    params.creatorId = req.user.id;
    try {
      const { code, data } = await notificationService.create(params);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
  getNotificationByUserId: async (req, res) => {
    let userId = req.user.id;
    try {
      const { code, data } = await notificationService.getNotificationByUserId({ userId });
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
};
