module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define("shop", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    rate: DataTypes.FLOAT,
    description: {
      type: DataTypes.TEXT,
    },
  });

  return Shop;
};
