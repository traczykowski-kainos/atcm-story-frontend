'use strict';

angular.module('shop.shopProducts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shopProducts', {
    templateUrl: 'shopProducts/shopProducts.html',
    controller: 'ShopProductsCtrl'
  });
}]);


