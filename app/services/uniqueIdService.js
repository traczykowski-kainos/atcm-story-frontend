'use strict';

angular.module('shop').factory('uniqueIdService', ['$http', 'configService', function($http, configService) {
	
	function getUniqueId() {
		return $http.get(configService.servicesBaseUrl + '/uniqueId');
	}

	return {
		getUniqueId : getUniqueId
	};
}]);