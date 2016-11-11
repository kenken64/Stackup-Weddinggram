/**
 * Created by phangty on 10/11/16.
 */
(function () {
    angular
        .module("weddingGramApp")
        .controller("RegisterCtrl", ["$sanitize", "$state", "AuthFactory", "Flash", RegisterCtrl]);

    function RegisterCtrl($sanitize, $state, AuthFactory, Flash){
        var vm = this;
        vm.emailAddress = "";
        vm.password = "";
        vm.confirmpassword = "";

        vm.register = function () {
            AuthFactory.register($sanitize(vm.emailAddress), $sanitize(vm.password))
                .then(function () {
                    vm.disabled = false;

                    vm.emailAddress = "";
                    vm.password = "";
                    vm.confirmpassword = "";
                    Flash.clear();
                    Flash.create('success', "Successfully sign up with us, Please proceed to login", 0, {class: 'custom-class', id: 'custom-id'}, true);
                    $state.go("SignIn");
                }).catch(function () {
                console.error("registration having issues");
            });
        };

    }
})();