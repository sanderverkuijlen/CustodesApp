app.controller('DetailCtrl', function DetailCtrl($scope, Credential, $routeParams){

  //Vars
  if($routeParams.credentialId > 0){
    $scope.credential = Credential.getDecrypt({ id: $routeParams.credentialId });
  }
  else{
    $scope.go('list');
  }

  //Functions
  $scope.edit = function (){

    $scope.go('credential/' + $scope.credential.id + '/edit');
  };
  $scope.delete = function (){

    $scope.credential.destroy(function (){
      $scope.go('list');
    });
  };


  //Events
  /*$scope.$on('login', function(event, message) {
   $scope.credentials = Credential.query(function(credentials) {
   $scope.credential = new Credential(credentials[0]);
   $scope.isViewLoading = false;
   });
   });*/

  $scope.$on('logout', function (event, message){

    $scope.credential = new Credential();
  });
});