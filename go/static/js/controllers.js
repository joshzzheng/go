'use strict';

GoApp

.controller('RedirectsController', function ($scope, Restangular) {
  var redirectPromise = Restangular.all('redirects')

  redirectPromise.getList({'results_per_page': 100}).then(function(redirects) {
    $scope.redirects = redirects;
  });
})

.controller('AddRedirectController', function ($scope, $state, $timeout, Restangular) {
  var redirect = Restangular.all('redirects');
  
  $scope.addRedirect = function() {
    if ($scope.addRedirectForm.$valid){
      var newRedirect = {
        'name': $scope.redirect.name, 
        'url': $scope.redirect.url
      }
      redirect.post(newRedirect).then(function() {
        $scope.message = "Successfully added";
        $scope.login_state = 'success';
        $timeout(function() {
          $state.go('menu.r')
        }, 800);
      }, function(error) {
        if(error.data.message === "IntegrityError") {
          $scope.message = "The name already exists"
        } else {
          $scope.message = "There was an error adding this redirect";
        } 
      });
    }
  }
})