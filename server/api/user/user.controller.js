var User = require("../../database").User;
var AuthProvider = require("../../database").AuthProvider;
var bcrypt   = require('bcryptjs');

exports.get = function (req, res) {
    User
        .findById(req.params.id)
        .then(function (user) {

            if (!user) {
                handler404(res);
            }

            res.json(user);
        })
        .catch(function (err) {
            handleErr(res, err);
        });
};

exports.register = function(req, res) {
    if(!req.body.password === req.body.confirmpassword) {
        return res.status(500).json({
            err: err
        });
    }
    console.log();
    var hashpassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    User.findOrCreate({where: {email: req.body.username,},defaults: { username: req.body.username, email: req.body.username,  password: hashpassword}})
        .spread(function(user, created) {
            if(created){
                user.password = "";
                res.status(200);
                returnResults(user,res);
            }else{
                user.password = "";
                handleErr(res);
            }
        }).error(function(error){
            handleErr(res, err);
    });
};

exports.list = function (req, res) {
    User
        .findAll()
        .then(function (users) {
            res.json(users);
        })
        .catch(function (err) {
            handleErr(res, err);
        });
};

exports.profile = function (req, res) {
    console.log("HELLO --> " + req.user.email);
    User.findOne({where: {email: req.user.email}})
        .then(function(result) {
            res.json(result);
        }).catch(function (err) {
        console.error(err);
        handleErr(res, err);
    });
};

exports.profiles = function (req, res) {
    AuthProvider.findAll({where: {userId: req.user.id}})
        .then(function(result) {
            res.status(200).json(result);
        }).catch(function (err) {
        console.error(err);
        handleErr(res, err);
    });
};

exports.create = function (req, res) {
    User
        .create(req.body)
        .then(function (user) {
            res.json(user);
        })
        .catch(function (err) {
            handleErr(res, err);
        });
};

exports.update = function (req, res) {
    User
        .findById(req.params.id)
        .then(function (user) {

            if (!user) {
                handler404(res);
            }

            res.json(user);
        })
        .catch(function (err) {
            handleErr(res, err);
        });
};

exports.remove = function (req, res) {
    User
        .findById(req.params.id)
        .then(function (user) {
            if (!user) {
                handler404(res);
            }

            res.json(user);
        })
        .catch(function (err) {
            handleErr(res, err);
        });
};


function handleErr(res) {
    handleErr(res, null);
}


function handleErr(res, err) {
    console.log(err);
    res
        .status(500)
        .json({
            error: true
        });
}

function handler404(res) {
    res
        .status(404)
        .json({message: "User not found!"});
}

function returnResults(results, res) {
    res.send(results);
}