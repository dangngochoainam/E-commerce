module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define("sub_category", {
    name: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  });
  return SubCategory;
};
