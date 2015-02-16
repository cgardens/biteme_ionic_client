angular.module('starter.recipe.controllers', [])

  .controller('RecipeCtrl', function($scope, $http, $stateParams) {
    // get request
    $http.get('http://localhost:3000/recipes/' + $stateParams.recipeId)
    .success(function(data) { $scope.recipe = data; })
    .error(function(data) { console.log('Error: ' + data); });

    // recipe queries
    $scope.currentStep = 0;

    $scope.incrementStep = function() {
      $scope.currentStep++;
    };

    $scope.findStep = function() {
      return $scope.recipe.instructions[$scope.currentStep];
    };

    $scope.findIngredient = function(inputIngredient) {
      var ingredients = $scope.recipe.ingredients;
      for (var key in ingredients) {
        if (ingredients[key].toLowerCase().indexOf(inputIngredient.toLowerCase()) >= 0) {
          return ingredients[key];
        }
      }
    };

    // caesar functions
    $scope.caesarSpeech = '';

    $scope.activateCaesar = function(str) {
      $scope.setTextArea(str);
      $scope.$apply();
      $scope.triggerCaesar();
    };

    $scope.setTextArea = function(str) {
      $scope.caesarSpeech = str;
    };

    $scope.triggerCaesar = function() {
      $('#textToSpeech input').trigger('click');
    }; // put into angular speak

    $scope.startCaesar = function() {
      $scope.activateCaesar("caesar here, at your service. let's begin. your first step is: " + $scope.findStep());
    };

    // set timer
    $scope.setTimer = function(seconds) {
      $scope.seconds = seconds * 60;
      var countdown = setInterval('setTimer()', 1000);
      if ($scope.seconds === 0) { clearInterval(countdown); }
      else { seconds--; }
    };

    // $scope.resetTime(seconds) {
    //   var minutes = Math.round((seconds - 30)/60);
    //   var remainingSeconds = seconds % 60;
    //   if (remainingSeconds < 10) {
    //       remainingSeconds = "0" + remainingSeconds;
    //   }
    //   document.getElementById('countdown').innerHTML = minutes + ":" + remainingSeconds;
    //   if (seconds == 0) {
    //       $interval.cancel($scope.countdown);
    //       document.getElementById('countdown').innerHTML = "Buzz Buzz";
    //   } else {
    //       seconds--;
    //   }
    // }

    // $scope.countdown = function() {
    //   if ($scope.seconds === 0) {
    //     clearInterval(countdown);
    //   }
    // }

    // $scope.countdown = $interval('resetTime()', 1000)

    // caesar commands
    if (annyang) {
      var commands = {
        // basic commands
        'hey caesar': function() {
          $scope.activateCaesar('caesar here, at your service');
          // possible need to restart annyang here
        },
        'caesar': function() {
          $scope.activateCaesar('caesar here, at your service');
        },
        'thank you caesar': function() {
          $scope.activateCaesar("you're quite welcome");
        },
        'thank you': function() {
          $scope.activateCaesar("you're quite welcome");
        },
        'thanks caesar': function() {
          $scope.activateCaesar("you're quite welcome");
        },
        'thanks': function() {
          $scope.activateCaesar("you're quite welcome");
        },

        // step commands
        'caesar next step': function() {
          $scope.incrementStep();
          $scope.activateCaesar($scope.findStep());
        },
        'next step': function() {
          $scope.incrementStep();
          $scope.activateCaesar($scope.findStep());
        },
        'caesar repeat step': function() {
          $scope.activateCaesar($scope.findStep());
        },
        'repeat step': function() {
          $scope.activateCaesar($scope.findStep());
        },

        // ingredient commands
        'caesar how much *ingredient': function(ingredient) {
          $scope.activateCaesar($scope.findIngredient(ingredient));
        },
        'how much *ingredient': function(ingredient) {
          $scope.activateCaesar($scope.findIngredient(ingredient));
        },
        'caesar how many *ingredient': function(ingredient) {
          var length = ingredient.length - 1;
          if (ingredient[length] === 's') {
            ingredient = ingredient.substr(0, length);
            if (ingredient[length - 1] === 'e') {
              ingredient = ingredient.substr(0, length - 1);
            }
          }
          $scope.activateCaesar($scope.findIngredient(ingredient));
        },
        'how many *ingredient': function(ingredient) {
          var length = ingredient.length - 1;
          if (ingredient[length] === 's') { ingredient = ingredient.substr(0, length); }
          $scope.activateCaesar($scope.findIngredient(ingredient));
        },

        // timer commands
        'caesar set timer for *time minutes': function(minutes) {
          $scope.setTimer(minutes);
          $scope.activateCaesar('I have set the timer for ' + minutes + ' minutes');
        },
        'set timer for *time minutes': function(minutes) {
          $scope.activateCaesar('I have set the timer for ' + minutes + ' minutes');
        },
        'caesar set a timer for *time minutes': function(minutes) {
          $scope.activateCaesar('I have set the timer for ' + minutes + ' minutes');
        },
        'set a timer for *time minutes': function(minutes) {
          $scope.activateCaesar('I have set the timer for ' + minutes + ' minutes');
        }
      };

      annyang.addCommands(commands);
      annyang.start();
    }
  });