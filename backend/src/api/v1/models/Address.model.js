module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "address",
    {
      city: {
        type: DataTypes.STRING,
      },
      district: {
        type: DataTypes.STRING,
      },
      ward: {
        type: DataTypes.STRING,
      },
      street: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Address;
};
