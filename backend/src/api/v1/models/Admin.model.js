module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "admin",
    {},
    {
      timestamps: false,
    }
  );
  return Admin;
};
