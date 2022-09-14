const mySqlDB = require('../../../config/mySqlDB')
const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(mySqlDB.DB, mySqlDB.USER, mySqlDB.PASSWORD, {
    host: mySqlDB.HOST,
    dialect: mySqlDB.dialect,
    pool: {
      max: mySqlDB.pool.max,
      min: mySqlDB.pool.min,
      acquire: mySqlDB.pool.acquire,
      idle: mySqlDB.pool.idle,
    },
    define: {
      freezeTableName: true,
      timestamps: true,
    },
  });
  
  module.exports = sequelize;