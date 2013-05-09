var directiveModule = angular.module('directiveModule', []);

directiveModule.directive('ngDialog', function factory($http) {
  return function(scope, element, attrs){

    console.log(this);
    console.log($http);
    console.log(scope);
    console.log(element);
    console.log(attrs);

    //Determine template url
    var templateUrl = attrs['ngDialog'];

    $http({ method: 'GET', url: templateUrl }).
      success(function(data, status, headers, config) {

        //Place template content in DOM
        element.replaceWith(data);

        //Bind close-on-escape event to document
        //TODO
      }).
      error(function(data, status, headers, config) {
        //Print debug message
        //TODO
      });
  }
});