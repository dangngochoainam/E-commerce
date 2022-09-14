module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    lastVisited: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    birthday: {
      type: DataTypes.DATE,
    },
    address: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  });

  return User;
};
