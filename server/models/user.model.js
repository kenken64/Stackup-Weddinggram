var Sequelize = require("sequelize");

module.exports = function (database) {
    return database.define('user', {
        username: {
            type : Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        email: {
            type:Sequelize.STRING,
            allowNull: false
        },
        addressLine1: Sequelize.STRING,
        addressLine2: Sequelize.STRING,
        city: Sequelize.STRING,
        postcode: Sequelize.STRING,
        phone: Sequelize.STRING,
        reset_password_token: {
            type: Sequelize.STRING,
            allowNull: true
        },
        remember_created_at: {
            type: Sequelize.DATE,
            allowNull: true
        },
        sign_in_count: {
            type: Sequelize.INTEGER(11),
            allowNull: true
        },
        current_sign_in_at: {
            type: Sequelize.DATE,
            allowNull: true
        },
        last_sign_in_at: {
            type: Sequelize.DATE,
            allowNull: true
        },
        current_sign_in_ip: {
            type: Sequelize.STRING,
            allowNull: true
        },
        last_sign_in_ip: {
            type: Sequelize.STRING,
            allowNull: true
        },
        reset_password_sent_at: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
};