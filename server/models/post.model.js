var Sequelize = require("sequelize");

module.exports = function (database) {
    return database.define('post', {
        caption: Sequelize.STRING,
        url: Sequelize.STRING,
        likeCount: Sequelize.INTEGER
    });
};