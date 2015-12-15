'use strict';

angular.module('shop').factory('shoppingCartService', ['$http', function($http) {
	
	var cart = [];

	var addItemToCart = function(itemId) {
		console.log('Added item' + itemId);
		cart.push(itemId);
	}

	var getNumberOfCartItems = function() {
		return cart.length;
	}

	return {
		addItemToCart : addItemToCart,
		getNumberOfCartItems : getNumberOfCartItems
	};

}]);