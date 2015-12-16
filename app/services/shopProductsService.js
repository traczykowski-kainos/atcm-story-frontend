'use strict';

angular.module('shop').factory('shopProductsService', ['$http', 'configService', 
	function($http, configService) {

	function getShopProducts() {
		return $http.get(configService.servicesBaseUrl + '/product/read');
	}

	return {
		getShopProducts : getShopProducts
	}

}]);