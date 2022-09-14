module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define("shop", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    rate: DataTypes.INTEGER,
    description: {
      type: DataTypes.TEXT,
    },
  });

  return Shop;
};
