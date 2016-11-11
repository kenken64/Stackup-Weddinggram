(function () {
    angular
        .module("weddingGramApp")
        .config(weddingGramAppConfig);
    weddingGramAppConfig.$inject = ["$stateProvider","$urlRouterProvider"];

    function weddingGramAppConfig($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('init',{
                url : '/',
                views: {
                    "nav": {
                        templateUrl: "../app/home/navigation.html"
                    },
                    "content": {
                        templateUrl: "../app/home/home.html"
                    }
                },
                controller : 'HomePageAppCtrl',
                controllerAs : 'ctrl'
            })
            .state('home',{
                url : '/home',
                views: {
                    "nav": {
                        templateUrl: "../app/home/navigation.html"
                    },
                    "content": {
                        templateUrl: "../app/home/home.html"
                    }
                },
                controller : 'HomePageAppCtrl',
                controllerAs : 'ctrl'
            })
            .state("SignIn", {
                url: "/signIn",
                views: {
                    "nav": {
                        templateUrl: "../app/home/navigation.html"
                    },
                    "content": {
                        templateUrl: "../app/users/login.html"
                    }
                },
                controller : 'LoginCtrl',
                controllerAs : 'ctrl'
            })
            .state("SignUp", {
                url: "/signUp",
                views: {
                    "nav": {
                        templateUrl: "../app/home/navigation.html"
                    },
                    "content": {
                        templateUrl: "../app/users/register.html"
                    }
                },
                controller : 'RegisterCtrl',
                controllerAs : 'ctrl'
            })
            .state("MyAccount", {
                url: "/MyAccount",
                views: {
                    "nav": {
                        templateUrl: "../app/home/navigation.html"
                    },
                    "content": {
                        templateUrl: "../app/profile/profile.html"
                    }
                },
                controller : 'MyAccountCtrl',
                controllerAs : 'ctrl'
            })
            .state('weddinggram',{
                url : '/weddinggram',
                views: {
                    "nav": {
                        templateUrl: "../app/home/navigation.html"
                    },
                    "content": {
                        templateUrl: "../app/home/wedding-gram.html"
                    }
                },
                controller : 'PostListCtrl',
                controllerAs : 'ctrl'
            })
            .state('profile',{
                url : '/profile',
                views: {
                    "nav": {
                        templateUrl: "../app/home/navigation.html"
                    },
                    "content": {
                        templateUrl: "../app/profile/profile.html"
                    }
                },
                controller : 'PostListCtrl',
                controllerAs : 'ctrl'
            })
            .state('back',{
                url : '/back',
                templateUrl :'../app/home/home.html',
                controller : 'PostListCtrl',
                controllerAs : 'ctrl'
            })
            .state('comments',{
                url : '/comments/:data',
                views: {
                    "nav": {
                        templateUrl: "../app/home/navigation.html"
                    },
                    "content": {
                        templateUrl: "../app/comment/comment.html"
                    }
                },
                controller : 'CommentDetailCtrl',
                controllerAs : 'ctrl'
            })

        $urlRouterProvider.otherwise("/");


    }
})();