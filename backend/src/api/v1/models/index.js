const { Sequelize, DataTypes } = require("sequelize");
const initData = require("./data");

//Connect to the database
const sequelize = require("../database/connect");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.Category = require("./Category.model")(sequelize, DataTypes);
db.SubCategory = require("./SubCategory.model")(sequelize, DataTypes);
db.User = require("./User.model")(sequelize, DataTypes);
db.Customer = require("./Customer.model")(sequelize, DataTypes);
db.Staff = require("./Staff.model")(sequelize, DataTypes);
db.Admin = require("./Admin.model")(sequelize, DataTypes);
db.Seller = require("./Seller.model")(sequelize, DataTypes);
db.Notification = require("./Notification.model")(sequelize, DataTypes);
// db.UserRole = require("./UserRole.model")(sequelize, DataTypes);
db.Payment = require("./Payment.model")(sequelize, DataTypes);
db.Address = require("./Address.model")(sequelize, DataTypes);
db.Order = require("./Order.model")(sequelize, DataTypes);
db.Comment = require("./Comment.model")(sequelize, DataTypes);
db.SubComment = require("./SubComment.model")(sequelize, DataTypes);
db.Review = require("./Review.model")(sequelize, DataTypes);
db.Shop = require("./Shop.model")(sequelize, DataTypes);
db.Shipper = require("./Shipper.model")(sequelize, DataTypes);
db.Product = require("./Product.model")(sequelize, DataTypes);
db.Promotion = require("./Promotion.model")(sequelize, DataTypes);
db.OrderDetails = require("./OrderDetails.model")(sequelize, DataTypes);
db.UserSearch = require("./UserSearch.model")(sequelize, DataTypes);
db.HistorySearch = require("./HistorySearch.model")(sequelize, DataTypes);

// Association

// One-to-One association
db.User.hasOne(db.Customer, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Customer.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.User.hasOne(db.Staff, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Staff.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.User.hasOne(db.Admin, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Admin.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.User.hasOne(db.Seller, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Seller.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

// One-to-Many association

db.Seller.hasMany(db.Shop, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Shop.belongsTo(db.Seller, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.Comment.hasMany(db.SubComment, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.SubComment.belongsTo(db.Comment, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.Category.hasMany(db.SubCategory, { onDelete: "SET NULL" });
db.SubCategory.belongsTo(db.Category, { onDelete: "SET NULL" });

db.User.hasMany(db.Notification, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Notification.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

// db.UserRole.hasMany(db.User, { onDelete: "SET NULL" });
// db.User.belongsTo(db.UserRole, { onDelete: "SET NULL" });

db.User.hasMany(db.Payment, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Payment.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.User.hasMany(db.Address, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Address.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.Customer.hasMany(db.Order, { onDelete: "SET NULL" });
db.Order.belongsTo(db.Customer, { onDelete: "SET NULL" });

db.Customer.hasMany(db.Comment, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Comment.belongsTo(db.Customer, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.Customer.hasMany(db.SubComment, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.SubComment.belongsTo(db.Customer, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.Customer.hasMany(db.Review, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Review.belongsTo(db.Customer, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.Shipper.hasMany(db.Order, { onDelete: "SET NULL" });
db.Order.belongsTo(db.Shipper, { onDelete: "SET NULL" });

db.Shop.hasMany(db.Order, { onDelete: "SET NULL" });
db.Order.belongsTo(db.Shop, { onDelete: "SET NULL" });

db.Shop.hasMany(db.Product, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Product.belongsTo(db.Shop, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.Shop.hasMany(db.Promotion, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Promotion.belongsTo(db.Shop, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.Promotion.hasMany(db.Product, { onDelete: "SET NULL" });
db.Product.belongsTo(db.Promotion, { onDelete: "SET NULL" });

db.Product.hasMany(db.Comment, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Comment.belongsTo(db.Product, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.Product.hasMany(db.Review, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Review.belongsTo(db.Product, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.Category.hasMany(db.Product, { onDelete: "SET NULL" });
db.Product.belongsTo(db.Category, { onDelete: "SET NULL" });

db.SubCategory.hasMany(db.Product, { onDelete: "SET NULL" });
db.Product.belongsTo(db.SubCategory, { onDelete: "SET NULL" });

// Many-to-Many association
db.Product.belongsToMany(db.Order, { through: db.OrderDetails });
db.Order.belongsToMany(db.Product, { through: db.OrderDetails });

db.User.belongsToMany(db.HistorySearch, { through: db.UserSearch });
db.HistorySearch.belongsToMany(db.User, { through: db.UserSearch });

// Khi nào cần sửa cấu trúc dữ liệu thì sửa alter:true
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  // .then(() => db.Category.bulkCreate(initData.category))
  // .then(() => db.SubCategory.bulkCreate(initData.subCategory))
  // .then(() => db.User.bulkCreate(initData.user))
  // .then(() => db.Customer.bulkCreate(initData.customer))
  // .then(() => db.Seller.bulkCreate(initData.seller))
  // .then(() => db.Shop.bulkCreate(initData.shop))
  // .then(() => db.Promotion.bulkCreate(initData.promotion))
  // .then(() => db.Product.bulkCreate(initData.product))
  // .then(() => db.Address.bulkCreate(initData.address))
  // .then(() => db.Payment.bulkCreate(initData.payment))
  // .then(() => db.Notification.bulkCreate(initData.notification))
  // .then(() => db.HistorySearch.bulkCreate(initData.historySearch))
  // .then(() => db.UserSearch.bulkCreate(initData.userSearch))
  // .then(() => db.Staff.bulkCreate(initData.staff))
  // .then(() => db.Admin.bulkCreate(initData.admin))
  // .then(() => db.Shipper.bulkCreate(initData.shipper))
  // .then(() => db.Order.bulkCreate(initData.order))
  // .then(() => db.OrderDetails.bulkCreate(initData.orderDetails))
  // .then(() => db.Review.bulkCreate(initData.review))
  // .then(() => db.Comment.bulkCreate(initData.comment))
  // .then(() => db.SubComment.bulkCreate(initData.subComment));


module.exports = db;
