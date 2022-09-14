module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("payment", {
    bank: {
      type: DataTypes.STRING,
    },
    account: { type: DataTypes.STRING },
  });
  return Payment;
};
