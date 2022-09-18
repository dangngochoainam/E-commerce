module.exports = (sequelize, DataTypes) => {

    const Notification = sequelize.define('notification',  {
        content: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING,
        },
        valueId: {
            type: DataTypes.INTEGER
        },
        creatorId: {
            type: DataTypes.INTEGER
        }
    })

    return Notification;
}