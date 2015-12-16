'use strict';

angular.module('shop.shopProducts').controller('ShopProductsCtrl', ['$scope', 'shopProductsService', 'shoppingCartService',
	function($scope, shopProductsService, shoppingCartService) {

		$scope.products = [];

		$scope.error = {
			errorState : false,
			errorMessage : ''
		}

		$scope.addProductToCart = function(product) {
			shoppingCartService.addItemToCart(product);
		}

		shopProductsService.getShopProducts().then(
			function success(response) {				
				console.log(response);				
				$scope.products = response.data;				
			},

			function fail(response) {								
				$scope.error.errorState = true;
				$scope.error.errorMessage = 'An application error has occurred, please try again later.';				
			}
		);
	}
]);