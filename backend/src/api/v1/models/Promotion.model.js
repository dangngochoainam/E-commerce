module.exports = (sequelize, DataTypes) => {

    const Promotion = sequelize.define('promotion', {
        type: {
            type: DataTypes.STRING,
        },
        code: {
            type: DataTypes.STRING
        },
        value: {
            type: DataTypes.DOUBLE,
            validate: {
                min: 0
            }
        }
    })

    return Promotion;
}