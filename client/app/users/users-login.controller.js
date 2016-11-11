/**
 * Created by phangty on 10/11/16.
 */
(function () {
    angular
        .module("weddingGramApp")
        .controller("LoginCtrl", ["$state", "AuthFactory", "Flash", LoginCtrl]);

    function LoginCtrl($state, AuthFactory, Flash){
        var vm = this;

        vm.login = function () {
            AuthFactory.login(vm.user)
                .then(function () {
                    if(AuthFactory.isLoggedIn()){
                        vm.emailAddress = "";
                        vm.password = "";
                        $state.go("home");
                    }else{
                        Flash.create('danger', "Ooops having issue logging in!", 0, {class: 'custom-class', id: 'custom-id'}, true);
                        $state.go("SignIn");
                    }
                }).catch(function () {
                console.error("Error logging on !");
            });
        };
    }
})();