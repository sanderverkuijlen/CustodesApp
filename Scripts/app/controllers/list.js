app.controller('ListCtrl', function ListCtrl($scope, Credential, $location) {

  //Vars
  $scope.groups = [];
  $scope.credentials = Credential.query(function() {
    $scope.groupCredentials();
  });


  //Functions
  $scope.groupCredentials = function() {

    //Start fresh
    $scope.groups = [];

    //Sort the credentials by GroupName
    $scope.credentials.sort(function(a, b) {

      if (a['GroupName'] <= b['GroupName']) {
        return -1;
      }
      return 1;
    });

    //The current group
    var groupValue = null;

    for(var i = 0; i < $scope.credentials.length; i++) {

      var credential = $scope.credentials[i];

      //Does this credential belong to the current group?
      if (credential.GroupName !== groupValue) {

        //It's a new group
        groupValue = credential.GroupName;

        var group = {
          name:         groupValue,
          credentials:  []
        };

        //Add the new group
        $scope.groups.push(group);
      }

      //Add this credential to the correct group
      group.credentials.push(credential);
    }
  }


  //Events
  /*$scope.$on('login', function(event, message) {
    $scope.credentials = Credential.query(function(credentials) {
      $scope.credential = new Credential(credentials[0]);
      $scope.isViewLoading = false;
    });
  });*/
  
  $scope.$on('logout', function(event, message) {

    $scope.groups = [];
    $scope.credentials = [];
  });
});