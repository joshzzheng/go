'use strict';

var GoApp = angular.module('Go', 
  ['ui.router', 'restangular', 'ui.bootstrap'])
  
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
         '$locationProvider', 'RestangularProvider', 
  function($stateProvider, $urlRouterProvider, $httpProvider,
           $locationProvider, RestangularProvider) {
    $stateProvider
      .state('menu', {
        url: '',
        abstract: true,
        templateUrl: 'static/partials/menu.html'
      })

      .state('menu.redirects', {
        url: '/redirects',
        templateUrl: 'static/partials/redirect-list.html',
        controller: 'RedirectsController'
      })
      
      .state('menu.add', {
        url: '/add',
        templateUrl: 'static/partials/add-redirect.html',
        controller: 'AddRedirectController'
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setResponseExtractor(function(response, operation) { 
      var newResponse; 
      if (operation === 'getList') {
        // Return the result objects as an array and attach the metadata
        if (response.data) {
          newResponse = response.data;
        } else if (response.objects) {
          newResponse = response.objects;
        }
      } else { 
        newResponse = response; 
      } 
      return newResponse;
    }); 
}])

.run(['$state', function ($state) {
  //go here initially
  $state.transitionTo('menu.redirects'); 
}]);