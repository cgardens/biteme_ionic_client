angular.module('starter.user.controllers', [])

  .controller('UserCtrl', function($scope, $http, $stateParams, $localStorage, $timeout) {
    $http.get('http://localhost:3000/users/' + $localStorage.userID)
      .success(function(data) {
        $scope.user = data.data;
      })
      .error(function(data) { console.log('Error: ' + data); })
    $http.get('http://localhost:3000/admin/users/' + $localStorage.userID + '/recipes')
      .success(function(data) {
        $scope.recipes = data.recipes;
      })

    $scope.doRefresh = function() {
      $timeout(function() { $scope.$broadcast('scroll.refreshComplete'); }, 1000);
    }
  })