module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define("shop", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    rate: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 5,
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  return Shop;
};
