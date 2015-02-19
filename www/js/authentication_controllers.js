angular.module('starter.auth.controllers', ['ngStorage'])

  .controller('AuthCtrl', ['$scope', '$http','$localStorage', '$location', '$window', function($scope, $http, $localStorage, $location, $window) {
    if ($localStorage.userID) { $location.path('/search'); };

    if ($location.search().id) {
      $localStorage.userID = $location.search().id;
      $localStorage.token = $location.search().token;
    };

    $scope.login = function(user) {
      $http.get('http://localhost:3000/facebook_signup')
        .success(function(res, body) {
          if (res.type === false) {
            $scope.error = res.data;
          } else {
            $window.location.href = res.url;
          }
        })
    };

    $scope.userLoggedIn = function() {
      if ($localStorage.userID) { return true; }
      else { return false; }
    }
  }]);