'use strict';

angular.module('shop.shopProducts').controller('ShopProductsCtrl', ['$scope', 'shopProductsService',
	function($scope, shopProductsService) {

		$scope.error = {
			errorState : false,
			errorMessage : ''
		}

		$scope.products = [];			

		shopProductsService.getShopProducts().then(
			function success(data) {								
				$scope.products = data;				
			},

			function fail(data) {								
				$scope.error.errorState = true;
				$scope.error.errorMessage = 'An application error has occurred, please try again later.';				
			}
		);
	}
]);