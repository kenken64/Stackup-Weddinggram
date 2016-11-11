/**
 * Created by phangty on 10/11/16.
 */
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var FacebookStrategy = require("passport-facebook").Strategy
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var WechatStrategy = require("passport-wechat").Strategy
var TwitterStrategy  = require('passport-twitter').Strategy;
var bcrypt   = require('bcryptjs');

var User = require("./database").User;
var AuthProvider = require("./database").AuthProvider;
var config = require("./config");

//Setup local strategy
module.exports = function (app, passport) {
    function authenticate(username, password, done) {

        User.findOne({
            where: {
                email: username
            }
        }).then(function(result) {
            if(!result){
                return done(null, false);
            }else{
                if(bcrypt.compareSync(password , result.password)){
                    return done(null, result);
                }else{
                    return done(null, false);
                }
            }
        }).catch(function(err){
            return done(err, false);
        });


    }

    function verifyCallback(accessToken, refreshToken, profile, done) {
        if(profile.provider === 'google' || profile.provider === 'facebook'|| profile.provider === 'linkedin'){
            id = profile.id;
            email = profile.emails[0].value;
            displayName = profile.displayName;
            provider_type = profile.provider;
            var hashpassword = bcrypt.hashSync('socialpwd', bcrypt.genSaltSync(8), null);
            User.findOrCreate({where: {email: email}, defaults: {username: email , email: email, password: hashpassword, name: displayName}})
                .spread(function(user, created) {
                    console.log(user.get({
                        plain: true
                    }));
                    console.log(created);
                    AuthProvider.findOrCreate({where: {userid: user.id, providerType: provider_type},
                        defaults: {providerId: id, userId: user.id, providerType: provider_type, displayName: displayName}})
                        .spread(function(provider, created) {
                            console.log(provider.get({
                                plain: true
                            }));
                            console.log(created);
                        });
                    done(null, user);
                });
        }else if(profile.provider === 'twitter'){
            id = profile.id;
            twitterUsername = profile.username;
            displayName = profile.displayName;
            provider_type = profile.provider;
            var hashpassword = bcrypt.hashSync('socialpwd', bcrypt.genSaltSync(8), null);
            User.findOrCreate({where: {email: twitterUsername}, defaults: {username: twitterUsername, email: twitterUsername, password: hashpassword , name: displayName}})
                .spread(function(user, created) {
                    console.log(user.get({
                        plain: true
                    }));
                    console.log(created);
                    AuthProvider.findOrCreate({where: {userid: user.id, providerType: provider_type},
                        defaults: {providerId: id, userId: user.id, providerType: provider_type, displayName: displayName}})
                        .spread(function(provider, created) {
                            console.log(provider.get({
                                plain: true
                            }));
                            console.log(created);
                        });
                    done(null, user);
                });
        }else{
            done(null, false);
        }
    }

    passport.use(new LinkedInStrategy({
        clientID: config.linkedin_key,
        clientSecret: config.Linkedin_secret,
        callbackURL: config.Linkedin_callback_url,
        scope: ['r_emailaddress', 'r_basicprofile'],
    }, verifyCallback));

    passport.use(new WechatStrategy({
            appID: config.Wechat_AppId,
            name: config.Wechat_Name,
            appSecret: config.Wechat_AppSecret,
            client: "web",
            callbackURL: config.Wechat_Callback_Url,
            scope: "snsapi_userinfo",
            state:""
        },
        function(accessToken, refreshToken, profile, done) {
            return done(err,profile);
        }
    ));

    passport.use(new TwitterStrategy({
        consumerKey: config.Twitter_key,
        consumerSecret: config.Twitter_secret,
        callbackURL: config.Twitter_callback_url
    }, verifyCallback))

    passport.use(new GoogleStrategy({
        clientID: config.GooglePlus_key,
        clientSecret: config.GooglePlus_secret,
        callbackURL: config.GooglePlus_callback_url
    }, verifyCallback))

    passport.use(new FacebookStrategy({
        clientID: config.Facebook_key,
        clientSecret: config.Facebook_secret,
        callbackURL: config.Facebook_callback_url,
        profileFields: ['id', 'displayName', 'photos', 'email']
    }, verifyCallback))

    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, authenticate));

    passport.serializeUser(function (user, done) {
        console.info("serial to session");
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        User.findOne({
            where: {
                email: user.email
            }
        }).then(function(result) {
            if(result){
                done(null, user);
            }
        }).catch(function(err){
            done(err, user);
        });
    });

};