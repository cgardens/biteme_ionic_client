angular.module('starter.auth.controllers', ['ngStorage'])

  .controller('AuthCtrl', ['$scope', '$http','$localStorage', '$location', function($scope, $http, $localStorage, $location) {

    $scope.userLoggedIn = function() {
      $localStorage.userID ? return true : return false;
    }

    $scope.signUp = function(new_user) {
      $http.post('http://localhost:3000/users/signup/', {
        firstName: new_user.signup_first_name,
        email:     new_user.signup_email,
        password:  new_user.signup_password
      })
      .success(function(res, body) {
        if (res.type === false) {
          $scope.signup_error = res.data;
        } else {
          $localStorage.token = res.token;
          $localStorage.userID = res.data._id;
          $scope.state.go("search_results")
        }
      });
    };

    $scope.login = function(user) {
      $http.post('http://localhost:3000/authenticate', {
        email: user.login_email,
        password: user.login_password
      })
      .success(function(res, body) {
        if (res.type === false) {
          $scope.login_error = res.data;
        } else {
          $localStorage.token = res.token;
          $localStorage.userID = res.data._id;
        }
      });
    };

    $scope.logout = function() {
      delete $localStorage.userID;
      delete $localStorage.token;
    };
  }]);