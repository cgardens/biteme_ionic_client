angular.module('starter.search.controllers', [])

  .controller('SearchResultCtrl', function($scope, $http, $stateParams) {
    $scope.searches = [];

    $scope.newSearch = { term: '' };

    $scope.getSearchResults = function() {
      $http.get('http://localhost:3000/recipes/search?term=' + $scope.newSearch.term)
      .success(function(data) { $scope.recipes = data; })
      .error(function(data) { console.log('Error: ' + data); });
    };
  });