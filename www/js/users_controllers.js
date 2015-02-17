angular.module('user.controllers', [])

  .controller('UserCtrl', function($scope, $http, $stateParams, $localStorage) {
    $http.get('http://localhost:3000/users/' + $localStorage.userID)
      .success(function(data) {
        $scope.user = data;
      })
      .error(function(data) { console.log('Error: ' + data); })
    $http.get('http://localhost:3000/admin/users/' + $localStorage.userID + '/recipes')
      .success(function(data) {
        $scope.recipes = data.recipes;
      })
  })