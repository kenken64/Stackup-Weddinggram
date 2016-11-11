'use strict';

var UserController = require("./api/user/user.controller");
var PostController = require("./api/post/post.controller");
var CommentController = require("./api/comment/comment.controller");
var AWSController = require("./api/aws/aws.controller");
var express = require("express");
var config = require("./config");

const API_POSTS_URI = "/api/posts";
const API_USERS_URI = "/api/users";
const API_COMMENTS_URI = "/api/comments";
const API_AWS_URI = "/api/aws";

module.exports = function (app, passport) {
    // Posts API
    app.get(API_POSTS_URI, isAuthenticated, PostController.list);
    app.get(API_POSTS_URI + '/image/:url', isAuthenticated, PostController.showImage);
    app.get(API_POSTS_URI + '/me', isAuthenticated, PostController.me);
    app.post(API_POSTS_URI, isAuthenticated, PostController.create);
    app.get(API_POSTS_URI + '/:id', isAuthenticated, PostController.get);
    app.post(API_POSTS_URI + '/:id', isAuthenticated, PostController.update);
    app.delete(API_POSTS_URI + '/:id', isAuthenticated, PostController.remove);
    app.post(API_POSTS_URI + '/:id/like', isAuthenticated, PostController.likePost);
    app.get(API_POSTS_URI + '/:postId/comments', isAuthenticated, CommentController.byPosts);

    // Users API
    app.get(API_USERS_URI, isAuthenticated, UserController.list);
    app.post(API_USERS_URI, isAuthenticated, UserController.create);
    app.get(API_USERS_URI+ '/:id', isAuthenticated, UserController.get);
    app.get(API_USERS_URI + '/:id/posts', isAuthenticated, PostController.listByUser);
    app.post(API_USERS_URI + '/:id', isAuthenticated, UserController.update);
    app.delete(API_USERS_URI + '/:id', isAuthenticated, UserController.remove);
    app.get("/api/user/view-profile", isAuthenticated, UserController.profile);
    app.get("/api/user/social/profiles", isAuthenticated, UserController.profiles);

    // Comments API
    app.post(API_COMMENTS_URI, isAuthenticated, CommentController.create);
    app.delete(API_COMMENTS_URI + '/:id', isAuthenticated, CommentController.remove);

    // AWS policy API
    app.get(API_AWS_URI + '/createS3Policy', isAuthenticated, PostController.list);
    app.post(API_AWS_URI + '/s3-policy', isAuthenticated, AWSController.getSignedPolicy);

    app.use(express.static(__dirname + "/../client/"));

    app.post('/register', UserController.register);

    app.get('/home', isAuthenticated, function(req, res) {
        res.redirect('../');
    });

    app.post("/login", passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/",
        failureFlash : true
    }));

    app.get("/oauth/google", passport.authenticate("google", {
        scope: ["email", "profile"]
    }));

    app.get("/oauth/google/callback", passport.authenticate("google", {
        successRedirect: "/home",
        failureRedirect: "/signUp"
    }));

    app.get("/oauth/facebook", passport.authenticate("facebook", {
        scope: ["email", "public_profile"]
    }));

    app.get("/oauth/facebook/callback", passport.authenticate("facebook", {
        successRedirect: "/home",
        failureRedirect: "/signUp",
        failureFlash : true
    }));

    app.get('/oauth/linkedin',
        passport.authenticate('linkedin', { state: 'SOME STATE'  }),
        function(req, res){
            // The request will be redirected to LinkedIn for authentication, so this
            // function will not be called.
        });

    app.get('/oauth/linkedin/callback', passport.authenticate('linkedin', {
        successRedirect: '/home',
        failureRedirect: '/signUp',
        failureFlash : true
    }));

    app.get('/oauth/wechat', passport.authenticate('wechat'));

    app.get('/oauth/wechat/callback', passport.authenticate('wechat', {
        failureRedirect: '/signUp',
        successReturnToOrRedirect: '/',
        failureFlash : true
    }));

    app.get('/oauth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/oauth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/home',
            failureRedirect : '/signUp'
        }));

    app.get("/status/user", function (req, res) {
        var status = "";
        if(req.user) {
            status = req.user.email;
        }
        console.info("status of the user --> " + status);
        res.send(status).end();
    });

    app.get("/logout", function(req, res) {
        req.logout();             // clears the passport session
        req.session.destroy();    // destroys all session related data
        res.send(req.user).end();
    });


    function isAuthenticated(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }

};


