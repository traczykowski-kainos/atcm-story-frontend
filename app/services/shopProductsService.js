'use strict';

angular.module('shop').factory('shopProductsService', ['$http', function($http) {

	function getShopProducts() {
		return $http.get('http://localhost:8080/atcm-shop-0.0.1-SNAPSHOT/product/read');
	}

	return {
		getShopProducts : getShopProducts
	}

}]);