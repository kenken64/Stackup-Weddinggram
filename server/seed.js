var bcrypt   = require('bcryptjs');
var config = require("./config");
var database = require("./database");
var User = database.User;
var Post = database.Post;

module.exports = function () {
    if (config.seed) {
        var hashpassword = bcrypt.hashSync("password@123", bcrypt.genSaltSync(8), null);
        User
            .create({
                username: "nikhil1",
                password: hashpassword,
                firstName: "Nikhil",
                lastName: "Bhandari",
                addressLine1: "79 02 Ayer raja crescent",
                addressLine2: "",
                city: "Singapore",
                email: "yes@yes.com",
                postcode: "42312",
                phone: "98832587",
                google: "http://google.com",
                facebook: "http://facebook.com",
                twitter: "http://twitter.com"
            })
            .then(function (user) {
                Post
                    .create({
                        caption: "Looks like a scene from Hollywood movie!",
                        url: "1477564902212_4.jpg"
                    })
                    .then(function (post) {
                        user
                            .addPost(post)
                            .then(function () {
                                console.log("Done");
                            })
                            .catch(function () {
                            });
                    })
                    .catch(function () {

                    });Post
                    .create({
                        caption: "Aaaaah!!!!!",
                        url: "1477564908055_5.jpg"
                    })
                    .then(function (post) {
                        user
                            .addPost(post)
                            .then(function () {
                                console.log("Done");
                            })
                            .catch(function () {
                            });
                    })
                    .catch(function () {

                    });Post
                    .create({
                        caption: "The DAY!",
                        url: "1477564913469_6.jpg"
                    })
                    .then(function (post) {
                        user
                            .addPost(post)
                            .then(function () {
                                console.log("Done");
                            })
                            .catch(function () {
                            });
                    })
                    .catch(function () {

                    });Post
                    .create({
                        caption: "Cute :*",
                        url: "1477564919836_7.jpg"
                    })
                    .then(function (post) {
                        user
                            .addPost(post)
                            .then(function () {
                                console.log("Done");
                            })
                            .catch(function () {
                            });
                    })
                    .catch(function () {

                    });
            })
            .catch(function () {
                console.log("Error", arguments)
            })

    }
};