'use strict';

angular.module('shop.shoppingCart', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shoppingCart', {
    templateUrl: 'app/shoppingCart/shoppingCart.html',
    controller: 'ShoppingCartCtrl'
  });
}]);