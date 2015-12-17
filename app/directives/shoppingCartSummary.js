'use strict';

angular.module('shop.shoppingCartSummary', [])
.directive('shoppingCartSummary', ['$rootScope','shoppingCartService', function($rootScope, shoppingCartService) {	
	return {	
		restrict: 'A',
		replace	: true,		
		template : '<a href="#/shoppingCart" class="btn btn-info btn-lg"><span class="glyphicon glyphicon-shopping-cart"></span> Items: <span class="badge">{{numItems}}</span></a>',
		link : function(scope) {

			scope.numItems = shoppingCartService.getNumberOfCartItems();

			$rootScope.$on('itemsUpdated', function() {
				scope.numItems = shoppingCartService.getNumberOfCartItems();
			});
		}
	}

}]);