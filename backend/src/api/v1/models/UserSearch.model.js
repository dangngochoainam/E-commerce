module.exports = (sequelize, DataTypes) => {
  const UserSearch = sequelize.define(
    "user_search",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return UserSearch;
};
