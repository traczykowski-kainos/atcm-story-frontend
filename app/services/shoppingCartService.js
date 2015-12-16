'use strict';

angular.module('shop').factory('shoppingCartService', ['$rootScope', '$http', 'uniqueIdService', 'configService',
	function($rootScope, $http, uniqueIdService, configService) {
	
	var cart = [];
	// var servicesBaseAddress = configService.servicesBaseUrl;

	var addItemToCart = function(item) {

		uniqueIdService.getUniqueId().then(
			function success(uniqueIdResponse) {

				$http.post(configService.servicesBaseUrl + '/cart/write/f697bac1-e50f-4acc-9387-561a448fbca9', 
						{ 
							productId : item.id,
						  	correlationId : uniqueIdResponse.data,
						  	updateDateTimeUTC : new Date().toISOString()
						}
					).then (
					function success(response) {
						cart.push(item);
						$rootScope.$broadcast('itemsUpdated');
					},

					function failure(response) {
						throw 'Error adding item to cart - item POST.';
					}
				)
			},

			function fail(response) {
				throw 'Error adding item to cart - generate correlation Id.';
			}
		)		
	}

	var getNumberOfCartItems = function() {
		return cart.length;
	}

	var getCartItems = function() {
		return cart;
	}

	var emptyCart = function() {
		cart = [];
	}

	return {
		addItemToCart : addItemToCart,
		getNumberOfCartItems : getNumberOfCartItems,
		getCartItems : getCartItems,
		emptyCart : emptyCart
	};
}]);