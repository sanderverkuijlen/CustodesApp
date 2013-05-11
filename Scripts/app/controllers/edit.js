app.controller('EditCtrl', function EditCtrl($scope, Credential, $routeParams){

  //Vars
  if(typeof $routeParams.credentialId !== 'undefined'){
    $scope.credential = Credential.getDecrypt({ id: $routeParams.credentialId });
  }
  else{
    $scope.credential = new Credential();

    console.log(Credential);
    console.log($scope.credential);
  }

  $scope.discard = function (){

    //Create
    if($scope.credential.id === undefined){

      $scope.go('list');
    }
    //Update
    else{

      $scope.go('credential/' + $scope.credential.id);
    }
  }

  //Functions
  $scope.save = function (){

    console.log($scope.credential);

    //Create
    if($scope.credential.id === undefined){

      $scope.credential.createEncrypt(function (){
        $scope.go('list');
      });
    }
    //Update
    else{

      $scope.credential.updateEncrypt(function (){
        $scope.go('list');
      });
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

    $scope.credential = new Credential();
  });
});