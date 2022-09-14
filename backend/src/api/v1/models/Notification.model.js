module.exports = (sequelize, DataTypes) => {

    const Notification = sequelize.define('notification',  {
        content: {
            type: DataTypes.STRING
        }
    })

    return Notification;
}