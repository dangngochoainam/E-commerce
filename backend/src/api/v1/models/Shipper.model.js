module.exports = (sequelize, DataTypes) => {

    const Shipper = sequelize.define('shipper', {
        code: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    })

    return Shipper;
}