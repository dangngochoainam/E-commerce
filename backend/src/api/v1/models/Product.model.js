module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    unitInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitOnOrder: {
        type: DataTypes.INTEGER,
    }
  });

  return Product;
};
