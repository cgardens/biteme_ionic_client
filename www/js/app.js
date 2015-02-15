// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.auth.controllers', 'starter.recipe.controllers', 'starter.search.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
   // .state('home', {
   //    url: '/',
   //    templateUrl: 'templates/authentication.html',
   //    controller: 'AuthCtrl as a'
   //  })

   //  .state('search', {
   //    url: '/search',
   //    templateUrl: 'templates/search_form.html',
   //    controller: 'SearchFormCtrl as sf'
   //  })

    .state('search_results', {
      url: '/search_results',
      templateUrl: 'templates/search_results.html',
      controller: 'SearchResultCtrl as sr'
    })

    .state('recipe', {
      url: '/recipes/:recipeId',
      templateUrl: 'templates/recipe_show.html',
      controller: 'RecipeCtrl as r'
    })

    // .state('user', {
    //   url: '/users/:userId',
    //   templateUrl: 'templates/user_show.html',
    //   controller: 'UserCtrl as u'
    // })

    $urlRouterProvider.otherwise('/');
  });