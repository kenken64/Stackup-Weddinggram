(function () {
    angular
        .module("weddingGramApp")
        .controller("CommentListCtrl", ["$http",'$state' ,CommentListCtrl]);

    function CommentListCtrl($http,$state) {
        var self = this;

        self.commentForm = {};
        self.comments = [];

        self.getComments = function (postId) {
            $http
                .get("/api/posts/" + postId + "/comments")
                .then(function (respose) {
                    self.comments = respose.data;
                })
                .catch(function () {

                })

        };

        self.showComments= function (post) {
            $state.go('comments',{data : JSON.stringify(post)})

        };
        self.addComment = function (postId) {
            console.log(self.commentForm);
            $http
                .post("/api/comments/", {
                    postId: postId,
                    text: self.commentForm.text
                })
                .then(function (response) {
                    self.comments.push(response.data);
                    self.commentForm.text = null;
                })
                .catch(function (err) {
                    self.errorMessage = err.message;
                });
        };
    }
})();
