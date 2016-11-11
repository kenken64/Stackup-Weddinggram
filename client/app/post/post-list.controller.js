(function () {
    angular
        .module("weddingGramApp")
        .controller("PostListCtrl", ["PostAPI", "$http", PostListCtrl]);

    function PostListCtrl(PostAPI, $http) {
        var self = this;

        PostAPI
            .me()
            .then(function (response) {
                self.posts = response.data;
            })
            .catch(function (err) {
                console.log(err);
            });

        self.like = function (post) {
            var likeUrl = "/api/posts/" + post.id + "/like";

            $http.post(likeUrl)
                .then(function () {
                    post.likeCount++;
                })
                .catch(function () {

                });
        };

    }
})();