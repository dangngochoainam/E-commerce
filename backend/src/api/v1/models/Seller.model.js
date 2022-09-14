module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define("seller", {
    type: {
      type: DataTypes.STRING,
    },
    isConfirm: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return Seller;
};
