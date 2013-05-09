app.controller('AppCtrl', function AppCtrl($scope, Authentication, $location) {

  $scope.loading = false;

  $scope.loadStart = function() {
    $scope.loading = true;
  }

  $scope.loadStop = function() {
    $scope.loading = false;
  }

  $scope.login = function(email, password) {

    //TODO: show loader

    Authentication.login(email, password, function(succes, data, status, headers, config) {

      //TODO: hide dialog

      if(succes) {
        $location.path('/list');
      }
      else {
        //TODO: show error stuff here
      }
    });
  }

  $scope.logout = function() {

    Authentication.logout();

    $scope.$broadcast('logout', {});

    $location.path('/');
  }
});