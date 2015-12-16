'use strict';

describe('The shoppingCartService', function() {

	var mockId = 12345;
	var shoppingCartService = {};
	var httpBackend = {};
	var mockconfigService = {		
		servicesBaseUrl : 'http://localhost:8080'		
	};
	var mockUniqueIdService = {
		getUniqueId : function() { }
	};
	var deferred;
	var rootScope;
	var mockItem = {
		id : '123'
	}
	var mockUniqueIdResponse = {
		data : '098765'
	} 	

	beforeEach(module('shop'));

	beforeEach(module(function ($provide) {
        $provide.value('configService', mockconfigService);
		$provide.value('uniqueIdService', mockUniqueIdService);        
    }));

	beforeEach(inject(function($httpBackend, $injector, $q) {
		mockUniqueIdService.getUniqueId = function() {
        		deferred = $q.defer();
        		return deferred.promise;        	
        }

        shoppingCartService = $injector.get('shoppingCartService');
		rootScope = $injector.get('$rootScope');
		httpBackend = $httpBackend;
	}));


	/* it('should send request to back-end service and add item to in-memory cart when addItemToCart is called', function() {
		/* httpBackend.whenPOST('http://localhost:8080/cart/write/f697bac1-e50f-4acc-9387-561a448fbca9', 
			{ id : mockItem.id,
			  corellationId : mockUniqueIdResponse.data,
			  updateDateTimeUTC : jasmine.any(Object) })
		.respond({});

		httpBackend.expectPOST('http://localhost:8080/cart/write/f697bac1-e50f-4acc-9387-561a448fbca9', 
			{ productId : mockItem.id,
			  corellationId : mockUniqueIdResponse.data,
			  updateDateTimeUTC : new Date().toISOString() });
		
		shoppingCartService.addItemToCart(mockItem);

		// Ensure service returns successful callback.      
        rootScope.$apply(function() {
        	deferred.resolve(mockUniqueIdResponse);
        });
	}); */

});