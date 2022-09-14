module.exports = (sequelize, DataTypes) => {
    const SubComment = sequelize.define('sub_comment',{
        content: {
            type: DataTypes.STRING
        }
    })
    return SubComment;
}