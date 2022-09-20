module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
          min: 0
      }
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    rate: {
      type: DataTypes.FLOAT,
      validate: {
          min: 0,
          max: 5
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    unitInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
          min: 0
      }
    },
    unitOnOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
  });

  return Product;
};
