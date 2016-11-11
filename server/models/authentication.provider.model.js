/**
 * Created by phangty on 10/11/16.
 */
var Sequelize = require("sequelize");

module.exports = function(database) {
    return database.define('authentication_provider', {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        providerId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        userId: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        providerType: {
            type: Sequelize.STRING,
            allowNull: true
        },
        displayName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        profile_photo: {
            type: 'BLOB',
            allowNull: true
        }
    }, {
        tableName: 'authentication_provider'
    });
};


