(function(){

    angular
        .module("weddingGramApp")
        .controller("ProfileCtrl", ["UserAPI", ProfileCtrl]);

    function ProfileCtrl(UserAPI){
        var vm = this;
        vm.sociallogins = [];
        UserAPI.getLocalProfile().then(function(result){
            console.log(result.data);
            vm.localProfile = result.data;
        });

        UserAPI.getAllSocialLoginsProfile().then(function(result){
            vm.sociallogins = result.data;
        });
    }
})();