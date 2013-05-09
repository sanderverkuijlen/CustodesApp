var app = angular.module('App', ['dataService', 'directiveModule']).

  config(['$routeProvider', function($routeProvider) {

    $routeProvider.
        when('/', { templateUrl: 'Scripts/templates/_login.html', controller: 'LoginCtrl' }).
        when('/list', { templateUrl: 'Scripts/templates/_list.html', controller: 'ListCtrl' }).
        when('/credential/:credentialId', { templateUrl: 'Scripts/templates/_detail.html', controller: 'DetailCtrl' }).
        otherwise({ redirectTo: '/' });

  }]).
  run(function($rootScope, $location, Authentication) {

    //Unfortunately the default routing doesnt provide for authentication, so we have this little workaround
    $rootScope.$on('$routeChangeStart', function(event, next, current) {

      //Check if there is an authorized user
      if (!Authentication.isAuthorized()) {

        var unprotectedRoutes = ['_login.html'];

        //There is no authorized user, check if the request is for a protected route
        if (unprotectedRoutes.indexOf(next.$route.templateUrl) == -1) {

          //A protected route was requested by an unauthorized user, redirect to /
          $location.path('/');
        }
      }
    });
  }).
  config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix = '!';
  }]);