'use strict'

angular.module('shop.shoppingCart').controller('ShoppingCartCtrl', ['$scope', 'shoppingCartService', 
	function($scope, shoppingCartService) {

		$scope.displayItems = [];

		// Get items
		var shoppingCartItems = shoppingCartService.getCartItems();		

		// Get unique items
		var deduplicatedItems = _.uniq(shoppingCartItems);		

		// Populate display items with unique items
		_.each(deduplicatedItems, function(item) {
			angular.extend(item, { quantity : 0 });
			$scope.displayItems.push(item);
		});

		// Increment quantities of displayed items
		_.each(shoppingCartItems, function(cartItem) {
			_.each($scope.displayItems, function(displayItem){
				if(cartItem.id === displayItem.id) {
					displayItem.quantity++;
				}
			});
		});		
}]);