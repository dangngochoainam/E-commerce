module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define(
    "staff",
    { hireDate: { type: DataTypes.DATE } },
    {
      timestamps: false,
    }
  );
  return Staff;
};
