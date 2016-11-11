var Comment = require("../../database").Comment;
var Post = require("../../database").Post;
var User = require("../../database").User;

exports.get = function (req, res) {
    Comment
        .findOne({
            where: {
                id: req.query.id
            }
        })
        .then(function (comment) {
            if (!comment) {
                return res
                    .status(404)
                    .json({message: "Comment Not Found"})
            }
            res.json(comment);
        })
        .catch(function (err) {
            handleErr(res, err);
        })

};

exports.listByUser = function (req, res) {
    Comment
        .findAll({
            where: {
                userId: req.params.id
            }
        })
        .then(function (comments) {
            res.json(comments || []);
        })
        .catch(function (err) {
            handleErr(res, err);
        });
};

exports.list = function (req, res) {
    Comment
        .findAll({})
        .then(function (comments) {
            res.json(comments || []);
        })
        .catch(function (err) {
            handleErr(res, err);
        })

};

exports.create = function (req, res) {
    Post
        .findById(req.body.postId)
        .then(function (post) {
            if (!post) {
                res
                    .status(404)
                    .json({message: "Post Not Found"});
            }
            Comment
                .create({
                    text: req.body.text,
                    postId: req.body.postId,
                    userId: 1

                })
                .then(function (comment) {
                    res.json(comment)
                })
                .catch(function (err) {
                    handleErr(res, err);
                });
        })
        .catch(function (err) {
            handleErr(res, err);
        });

};

exports.update = function (req, res) {
    Comment
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function (comment) {
            comment
                .update(req.body)
                .then(function () {
                    res.json(comment)
                })
                .catch(function () {

                });
        })
        .catch(function (err) {
            handleErr(res, err);
        });
};

exports.remove = function (req, res) {
    Comment
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function (comment) {

            res.json({success:true});
        })
        .catch(function () {

        });
};

exports.byPosts = function (req, res) {
    Comment
        .findAll({
            where: {
                postId: req.params.postId
            },
            include: [User]
        })
        .then(function (comments) {
            res.json(comments)
        })
        .catch(function (err) {
            handleErr(res, err);
        })
};

function handleErr(res, err) {
    res
        .status(500)
        .json({
            error: true
        });
}