var Post = require("../../database").Post;
var User = require("../../database").User;
var config = require('../../config')
var AWS = require('aws-sdk');

AWS.config.region = config.aws.region;
var s3Bucket =  new AWS.S3({
    params:  {
        Bucket: config.aws.bucket
    }
});


exports.get = function (req, res) {
    Post
        .findOne({
            where: {
                id: req.query.id
            }
        })
        .then(function (post) {
            if (!post) {
                return res
                    .status(404)
                    .json({message: "Post Not Found"})
            }
            res.json(post);
        })
        .catch(function (err) {
            handleErr(res, err);
        })

};

exports.listByUser = function (req, res) {
    Post
        .findAll({
            where: {
                userId: req.params.id
            },
            include: [User]
        })
        .then(function (posts) {
            res.json(posts || []);
        })
        .catch(function (err) {
            handleErr(res, err);
        });
};

exports.list = function (req, res) {
    Post
        .findAll({})
        .then(function (posts) {
            res.json(posts || []);
        })
        .catch(function (err) {
            handleErr(res, err);
        })

};

exports.create = function (req, res) {
    Post
        .create({
            url: req.body.url,
            caption: req.body.caption,
            userId: 1
        })
        .then(function (post) {
            res.json(post);
        })
        .catch(function (err) {
            console.log(err);
            res
                .status(500)
                .json({error: true});
        });
};

exports.update = function (req, res) {
    Post
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function (post) {
            post
                .update(req.body)
                .then(function () {
                    res.json(post)
                })
                .catch(function () {

                });
        })
        .catch(function (err) {
            handleErr(res, err);
        });
};

exports.me = function (req, res) {
    PostArr = [];
    Post
        .findAll({
            where: {
                userId: 1
            },
            include: [User]
        })
        .then(function (posts) {
            res.json(posts || []);
        })
        .catch(function (err) {
            handleErr(res, err);
        })
};

exports.remove = function (req, res) {
    Post
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function (post) {
            if (post) {

            }
        })
        .catch(function () {

        });
};


exports.showImage = function(req, res){
    console.log(req.params.url);
    console.log(config.aws.url);
    console.log(config.aws.bucket);
    var params = {Bucket: config.aws.bucket , Key: req.params.url};
    var stream = s3Bucket.getObject(params).createReadStream();
    stream.pipe(res);
};

exports.likePost = function (req, res) {
    Post
        .findById(req.params.id)
        .then(function (post) {
            post.likeCount++;
            post
                .save()
                .then(function () {
                    res.json(post);
                })
                .catch(function (err) {
                    handleErr(res, err);
                });
        })
        .catch(function (err) {
            handleErr(res, err);
        })
};

function handleErr(res, err) {
    console.log(err);
    res
        .status(500)
        .json({
            error: true
        });
}