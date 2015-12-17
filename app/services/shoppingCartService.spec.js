'use strict';

describe('The shoppingCartService', function() {
	
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
		spyOn(rootScope, '$broadcast');
		httpBackend = $httpBackend;
	}));


	it('should send request to back-end service and add item to in-memory cart when addItemToCart is called, and broadcast itemsUpdated event', function() {		
		// Mock 202 response from back-end Wildfly service call
		httpBackend.expectPOST('http://localhost:8080/cart/write/f697bac1-e50f-4acc-9387-561a448fbca9').respond(202);
		
		shoppingCartService.addItemToCart(mockItem);

		// Ensure uniqueIdService service returns successful callback.      
        rootScope.$apply(function() {
        	deferred.resolve(mockUniqueIdResponse);
        });

        httpBackend.flush();

        expect(shoppingCartService.getCartItems()).toContain(mockItem);
        expect(rootScope.$broadcast).toHaveBeenCalledWith('itemsUpdated');
        httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});

	it('should throw exception when back-end Wildfly service returns HTTP 500 for adding item', function() {		
		// Mock 500 response from back-end Wildfly service call
		httpBackend.expectPOST('http://localhost:8080/cart/write/f697bac1-e50f-4acc-9387-561a448fbca9').respond(500);
		
		shoppingCartService.addItemToCart(mockItem);

		// Ensure service returns successful callback.      
        rootScope.$apply(function() {
        	deferred.resolve(mockUniqueIdResponse);
        });

        // Catch expected error on executing backend response and verify its what we expect
        try {
        	httpBackend.flush(); 
    	}
        catch (error) {        	
        	expect(error).toEqual('Error adding item to cart - item POST.');
        }

        // Item should not have been added to cart
        expect(shoppingCartService.getCartItems()).toEqual([]);               
	});

	it('should throw exception when back-end service returns HTTP 500 for getting unique ID', function() {		
		// Invoke method
		shoppingCartService.addItemToCart(mockItem);

		// Reject call for uniqueIdService and ensure correct error is thrown.
		try {
	        rootScope.$apply(function() {        	
	        	deferred.reject();
	        });
    	} catch (error) {
    		expect(error).toEqual('Error adding item to cart - generate correlation Id.');
    	}   
	});	

	it('should call the backend service to remove an item from the basket when the remove function is called, should also decrement the local store by 1', function() {		
		// First we need to add an item to the cart and assert that it has been added.
		httpBackend.expectPOST('http://localhost:8080/cart/write/f697bac1-e50f-4acc-9387-561a448fbca9').respond(202);
		
		shoppingCartService.addItemToCart(mockItem);		
      
        rootScope.$apply(function() {
        	deferred.resolve(mockUniqueIdResponse);
        });

        httpBackend.flush();
        expect(shoppingCartService.getCartItems()).toContain(mockItem);
        expect(shoppingCartService.getNumberOfCartItems()).toEqual(1);
        expect(rootScope.$broadcast).toHaveBeenCalledWith('itemsUpdated');

        // Now set expectation for delete call and execute
        httpBackend.expectDELETE('http://localhost:8080/cart/write/f697bac1-e50f-4acc-9387-561a448fbca9').respond(202);
        shoppingCartService.removeItemFromCart(mockItem);

        rootScope.$apply(function() {
        	deferred.resolve(mockUniqueIdResponse);
        });

        httpBackend.flush();

        // Assert item count has been reduced and no outstanding requests.
		expect(shoppingCartService.getNumberOfCartItems()).toEqual(0);
        expect(rootScope.$broadcast).toHaveBeenCalledWith('itemsUpdated');
        
        httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});

	it('should throw exception when back-end service returns HTTP 500 for removing an item', function() {		
		// First we need to add an item to the cart and assert that it has been added.
		httpBackend.expectPOST('http://localhost:8080/cart/write/f697bac1-e50f-4acc-9387-561a448fbca9').respond(202);
		
		shoppingCartService.addItemToCart(mockItem);		
      
        rootScope.$apply(function() {
        	deferred.resolve(mockUniqueIdResponse);
        });

        httpBackend.flush();
        expect(shoppingCartService.getCartItems()).toContain(mockItem);
        expect(shoppingCartService.getNumberOfCartItems()).toEqual(1);
        expect(rootScope.$broadcast).toHaveBeenCalledWith('itemsUpdated');


		// Mock 500 response from back-end service call to return error
		httpBackend.expectDELETE('http://localhost:8080/cart/write/f697bac1-e50f-4acc-9387-561a448fbca9').respond(500);
		
		shoppingCartService.removeItemFromCart(mockItem);

		// Ensure service returns successful callback.      
        rootScope.$apply(function() {
        	deferred.resolve(mockUniqueIdResponse);
        });

        // Catch expected error on executing backend response and verify its what we expect
        try {
        	httpBackend.flush(); 
    	}
        catch (error) {        	
        	expect(error).toEqual('Error removing item from cart - item DELETE.');
        }

        // Item should not have been removed to cart
        expect(shoppingCartService.getNumberOfCartItems()).toEqual(1);             
	});

	it('should throw exception when back-end service returns HTTP 500 for getting unique ID when trying to remove an item', function() {		
		// Invoke method
		shoppingCartService.removeItemFromCart(mockItem);

		// Reject call for uniqueIdService and ensure correct error is thrown.
		try {
	        rootScope.$apply(function() {        	
	        	deferred.reject();
	        });
    	} catch (error) {
    		expect(error).toEqual('Error removing item from cart - generate correlation Id.');
    	}   
	});	
});