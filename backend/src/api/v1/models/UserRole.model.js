module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "user_role",
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return UserRole;
};
