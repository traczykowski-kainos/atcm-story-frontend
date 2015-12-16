'use strict';

angular.module('shop').factory('uniqueIdService', ['$http', function($http) {
	
	function getUniqueId() {
		return $http.get('http://localhost:8080/atcm-shop-0.0.1-SNAPSHOT/uniqueId');
	}

	return {
		getUniqueId : getUniqueId
	};
}]);