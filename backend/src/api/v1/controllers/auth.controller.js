const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');
const userService = require('../services/user.service');

let refreshTokens = [];

const authController = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        roles: user.roles.split(','),
      },
      process.env.JWT_ACCESS_KEY,
      {
        // expiresIn: "0.5h",
        expiresIn: '30 days',
      }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        roles: user.roles.split(','),
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: '30 days',
      }
    );
  },

  register: async (req, res) => {
    try {
      const user = req.body;
      user.createdAt = new Date();
      user.updatedAt = new Date();
      if (req.files) user.avatar = req.files.avatar.tempFilePath;

      const newUser = await authService.register({ user });
      const { code, data } = newUser;
      return res.status(code).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json();
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const { code, data } = await authService.login(username, password);
      if (data.status === 404) {
        return res.status(code).json(data);
      }

      const accessToken = authController.generateAccessToken(data.data);
      const refreshToken = authController.generateRefreshToken(data.data);

      if (refreshToken) {
        refreshTokens.push(refreshToken);
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict',
        });
      }
      return res.status(code).json({
        data: {
          ...data,
          accessToken,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken))
      return res.status(401).json('Refresh token is invalid');

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
      if (err) console.log(err);
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      user = await userService.getUserByID(user.id);
      const newAccessToken = authController.generateAccessToken(user.data.user);
      const newRefreshToken = authController.generateRefreshToken(
        user.data.user
      );
      refreshTokens.push(newRefreshToken);

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });

      return res.status(200).json({
        data: { accessToken: newAccessToken },
      });
    });
  },
  logout: (req, res) => {
    res.clearCookie('refreshToken');
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );

    return res.status(200).json({
      data: {
        status: 204,
      },
    });
  },
};

module.exports = authController;
