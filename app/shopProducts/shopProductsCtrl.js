'use strict';

angular.module('shop.shopProducts').controller('ShopProductsCtrl', ['$scope', 'shopProductsService', 'shoppingCartService',
	function($scope, shopProductsService, shoppingCartService) {

		$scope.products = [];

		$scope.error = {
			errorState : false,
			errorMessage : ''
		}

		$scope.addProductToCart = function(product) {
			try {
				shoppingCartService.addItemToCart(product);
			} catch (error) {
				$scope.error.errorState = true;
				$scope.error.errorMessage = 'There was an error adding the item to your cart, please try again later.';				
			}
		}

		shopProductsService.getShopProducts().then(
			function success(response) {										
				$scope.products = response.data;				
			},

			function fail(response) {								
				$scope.error.errorState = true;
				$scope.error.errorMessage = 'An application error has occurred, please try again later.';				
			}
		);
	}
]);