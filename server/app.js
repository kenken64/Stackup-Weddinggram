var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var passport = require("passport");

var config = require("./config");

var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Initialize session
app.use(session({
    secret: "wedding-gram-secret",
    resave: false,
    saveUninitialized: true
}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

require('./auth.js')(app, passport);
require("./routes")(app, passport);

app.listen(config.port, function () {
    console.log("Server running at http://localhost:" + config.port);
});
