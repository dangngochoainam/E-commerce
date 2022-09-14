module.exports = (sequelize, DataTypes) => {

    const HistorySearch =  sequelize.define('history_search', {
        keyword: {
            type: DataTypes.STRING,
        }
    })

    return HistorySearch;
}