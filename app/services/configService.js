'use strict';

angular.module('shop').factory('configService', [function() {
	return {
		servicesBaseUrl : 'http://localhost:9420'
	}
}]);