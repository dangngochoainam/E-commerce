
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "customer",
    {
      point: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );

  return Customer;
};
