'use strict';

// Declare app level module which depends on views, and components
angular.module('shop', [
  'ngRoute',  
  'shop.shopProducts',  
  'shop.shoppingCart',
  'shop.shoppingCartSummary',
  'shop.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/shopProducts'});
}]);
