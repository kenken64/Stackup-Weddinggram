var Sequelize = require('sequelize');
var config = require("./config");

console.log(config.mysql);
var database = new Sequelize(config.mysql, {
    pool: {
        max: 2,
        min: 1,
        idle: 10000
    }
});

var User = require("./models/user.model.js")(database);
var Post = require("./models/post.model.js")(database);
var Comment = require("./models/comment.model.js")(database);
var AuthProvider = require("./models/authentication.provider.model.js")(database);

// BEGIN: MYSQL RELATIONS

User.hasMany(Post);
Post.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);
Comment.belongsTo(User);
User.hasMany(AuthProvider, { foreignKey: 'userId' });

// END: MYSQL RELATIONS

database
    .sync({force: config.seed})
    .then(function () {
        console.log("Database in Sync Now");
        require("./seed")();
    });

module.exports = {
    User: User,
    Post: Post,
    Comment: Comment,
    AuthProvider: AuthProvider,
};

