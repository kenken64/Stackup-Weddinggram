/**
 * Created by phangty on 10/11/16.
 */
(function () {
    angular.module("weddingGramApp")
        .service("UserAPI", [
            "$http",
            "$q",
            UserAPI
        ]);

    function UserAPI($http, $q) {
        var self = this;

        self.getLocalProfile = function (callback){
            var defer = $q.defer();
            $http.get("/api/user/view-profile")
                .then(function(result){
                    defer.resolve(result);
                }).catch(function(error){
                defer.reject(error);
            });
            return defer.promise;
        };

        self.getAllSocialLoginsProfile = function (callback){
            var defer = $q.defer();
            $http.get("/api/user/social/profiles")
                .then(function(result){
                    defer.resolve(result);
                }).catch(function(error){
                defer.reject(error);
            });
            return defer.promise;
        };
    }
})();