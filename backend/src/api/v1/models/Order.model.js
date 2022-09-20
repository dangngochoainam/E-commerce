module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        shipAddress: {
            type: DataTypes.STRING
        },
        isConfirm: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        payment: {
            type: DataTypes.STRING
        },
    })

    return Order;
}