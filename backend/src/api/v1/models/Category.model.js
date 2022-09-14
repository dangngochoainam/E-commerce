module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,

      timestamps: false,
    }
  );

  return Category;
};
