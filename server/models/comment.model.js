var Sequelize = require("sequelize");

module.exports = function (database) {
    return database.define('comment', {
        text: Sequelize.STRING
    });
};