app.controller('ListCtrl', function ListCtrl($scope, Credential){

  //Vars
  $scope.groups = [];
  $scope.credentials = [];
  Credential.queryDecrypt(function (credentials) {
    $scope.credentials = credentials;
    $scope.groupCredentials();
  });


  //Functions
  $scope.groupCredentials = function (){

    //Start fresh
    $scope.groups = [];

    //Sort the credentials by GroupName
    $scope.credentials.sort(function (a, b){

      if(a['groupname'] <= b['groupname']){
        return -1;
      }
      return 1;
    });

    //The current group
    var groupValue = null;

    for (var i = 0; i < $scope.credentials.length; i++){

      var credential = $scope.credentials[i];

      //Does this credential belong to the current group?
      if(credential['groupname'] !== groupValue){

        //It's a new group
        groupValue = credential['groupname'];

        var group = {
          name: groupValue,
          credentials: []
        };

        //Add the new group
        $scope.groups.push(group);
      }

      //Add this credential to the correct group
      group.credentials.push(credential);
    }
  };


  //Events
  /*$scope.$on('login', function(event, message) {
   $scope.credentials = Credential.query(function(credentials) {
   $scope.credential = new Credential(credentials[0]);
   $scope.isViewLoading = false;
   });
   });*/

  $scope.$on('logout', function (event, message){

    $scope.groups = [];
    $scope.credentials = [];
  });
});