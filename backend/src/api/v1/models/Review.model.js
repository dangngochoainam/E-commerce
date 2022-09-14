module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("review", {
    rate: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.STRING,
    },
  });
  return Review;
};
