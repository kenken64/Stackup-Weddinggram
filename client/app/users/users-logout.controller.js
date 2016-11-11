/**
 * Created by phangty on 10/11/16.
 */
(function () {
  angular
        .module("weddingGramApp")
        .controller("LogoutCtrl", ["$state", "AuthFactory", "Flash", LogoutCtrl]);

    function LogoutCtrl($state, AuthFactory, Flash){
        var vm = this;

        vm.logout = function () {
            AuthFactory.logout()
                .then(function () {
                    $state.go("SignIn");
                }).catch(function () {
                console.error("Error logging on !");
            });
        };
    }
})();
