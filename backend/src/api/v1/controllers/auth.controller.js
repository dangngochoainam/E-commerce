const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user } = require("../models/data");
const authService = require("../services/auth.service");
const userService = require("../services/user.service");

let refreshTokens = [];

const authController = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        roles: user.roles.split(","),
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "0.5h",
      }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        roles: user.roles.split(","),
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: "30 days",
      }
    );
  },
  register: async (req, res) => {
    try {
      const user = req.body;
      if (req.file !== undefined) user.avatar = req.file.path;
      console.log(req.file.path)
      const newUser = await authService.register({ user });
      const { code, data, message } = newUser;
      return res.status(code).json({ data, message });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const { code, message, user } = await authService.login(
        username,
        password
      );

      const accessToken = authController.generateAccessToken(user);
      const refreshToken = authController.generateRefreshToken(user);

      if (refreshToken) {
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
      }
      return res.status(code).json({ user, accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken))
      return res.status(401).json("Refresh token is invalid");

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
      if (err) console.log(err);
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      user = await userService.getUserByID(user.id);
      const newAccessToken = authController.generateAccessToken(user.user);
      const newRefreshToken = authController.generateRefreshToken(user.user);
      refreshTokens.push(newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      return res.status(200).json({ accessToken: newAccessToken });
    });
  },
  logout: (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );

    return res.status(200).json("Logged out !!");
  },
};

module.exports = authController;
