(function () {
    angular
        .module("weddingGramApp")
        .controller("CommentDetailCtrl", ["$http",'$stateParams' ,CommentDetailCtrl]);

    function CommentDetailCtrl($http,$stateParams) {
        var self = this;

        self.commentForm = {};
        self.comments = [];

        
        self.getComments = function (postId) {
            $http
                .get("/api/posts/" + postId + "/comments")
                .then(function (respose) {
                    self.comments = respose.data;
                    //  $state.go('comments',self.comments);
                })
                .catch(function () {

                })

        };

        self.like = function (postId) {
            var likeUrl = "/api/posts/" + postId + "/like";

            $http.post(likeUrl)
                .then(function () {
                    self.data.likeCount++;
                })
                .catch(function () {

                });
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

        self.deleteComment = function (comment) {
            $http
                .delete("/api/comments/"+comment.id)
                .then(function (response) {
                    self.getComments(comment.postId);
                })
                .catch(function (err) {
                    self.errorMessage = err.message;
                });
        };
        
        if($stateParams.data){
            var data=  JSON.parse($stateParams.data);
            self.data=data;
            self.getComments( self.data.id)
        }
        
    }
})();
