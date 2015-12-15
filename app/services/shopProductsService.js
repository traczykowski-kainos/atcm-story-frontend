'use strict';

angular.module('shop').factory('shopProductsService', ['$http', '$q', function($http, $q) {
	
	function getShopProducts() {		
		return $q.resolve([
			{
					id : 1,
					name : 'Bronze Bangle',
					description : 'This tough bangle will protect any FF7 character from the most dangerous of Shinra\'s SOLDIER fighters',
					imageUrl : 'http://vignette2.wikia.nocookie.net/finalfantasy/images/2/25/FF7_Gold_armlet.png/revision/latest/scale-to-width-down/150?cb=20100521015142',
					cost : '300g',
					category : 'Defence Clothing',
					tags : ['Defence', 'Armour']
			},
			{
					id : 2,
					name : 'Titan Bangle',
					description : 'Offers more protection than the Bronze Bangle',
					imageUrl : 'http://vignette3.wikia.nocookie.net/finalfantasy/images/6/67/FF7_Titan_bangle.png/revision/latest?cb=20100521050744',
					cost : '500g',
					category : 'Defence Clothing',
					tags : ['Defence', 'Armour']
			}
		]);		
	}

	return {
		getShopProducts : getShopProducts
	}

}]);