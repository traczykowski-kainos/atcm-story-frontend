'use strict';

angular.module('shop').factory('configService', [function() {
	return {
		servicesBaseUrl : 'http://localhost:8080/atcm-shop-0.0.1-SNAPSHOT'
	}
}]);