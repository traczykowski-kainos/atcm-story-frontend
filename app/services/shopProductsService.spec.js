'use strict';

describe('The shopProductService', function() {

	var mockId = 12345;
	var shopProductsService = {};
	var httpBackend = {};
	var mockconfigService = {		
		servicesBaseUrl : 'http://localhost:8080'		
	}

	beforeEach(module('shop'));

	beforeEach(module(function ($provide) {
        $provide.value('configService', mockconfigService);
    }));

	beforeEach(inject(function(_uniqueIdService_, $httpBackend, $injector) {  	
		shopProductsService = $injector.get('shopProductsService');
		httpBackend = $httpBackend;
	}));

	it('should call the correct http endpoint when products are requested', function() {

		httpBackend.whenGET('http://localhost:8080/product/read').respond({});		

		shopProductsService.getShopProducts();

		httpBackend.flush();
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});

});