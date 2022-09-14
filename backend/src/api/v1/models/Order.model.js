module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        totalPrice: {
            type: DataTypes.DECIMAL
        },
        shipAddress: {
            type: DataTypes.STRING
        },
        isConfirm: {
            type: DataTypes.BOOLEAN
        },
        payment: {
            type: DataTypes.STRING
        },
    })

    return Order;
}