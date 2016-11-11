(function () {
    angular
        .module("weddingGramApp")
        .service("PostAPI", [
            "$http",
            PostAPI
        ]);

    function PostAPI($http) {
        var self = this;

        self.me = function () {
            return $http.get("/api/posts/me");
        };

        self.create = function (post) {
            return $http.post("/api/posts", post)
        }
    }
})();