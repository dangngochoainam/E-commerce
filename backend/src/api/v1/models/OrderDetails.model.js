module.exports = (sequelize, DataTypes) => {

    const OrderDetails = sequelize.define('order_details',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate: {
                min: 0
            }
        },
        unitPrice: {
            type: DataTypes.DECIMAL,
        },
        discount: {
            type: DataTypes.DOUBLE
        }
    }, {
        timestamps: false
    })

    return OrderDetails;


}