(function () {
    angular
        .module("weddingGramApp")
        .controller("HomePageAppCtrl", ["$q", "AuthFactory", HomePageAppCtrl]);

    function HomePageAppCtrl($q, AuthFactory){
        var vm = this;
        AuthFactory.getUserStatus(function(result){
            vm.isUserLogon = result;
        });
        vm.isUserLogon = AuthFactory.isLoggedIn();

        var defer = $q.defer();
        vm.err = null;
    }

})();