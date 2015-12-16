'use strict';

describe('The uniqueIdService', function() {

	var mockId = 12345;
	var uniqueIdService = {};
	var httpBackend = {};
	var mockconfigService = {		
		servicesBaseUrl : 'http://localhost:8080'		
	}

	beforeEach(module('shop'));

	beforeEach(module(function ($provide) {
        $provide.value('configService', mockconfigService);
    }));

	beforeEach(inject(function(_uniqueIdService_, $httpBackend, $injector) {  	
		uniqueIdService = $injector.get('uniqueIdService');
		httpBackend = $httpBackend;
	}));

	it('should call the correct http endpoint when an new Id is requested', function() {

		httpBackend.whenGET('http://localhost:8080/uniqueId').respond({});		

		uniqueIdService.getUniqueId();

		httpBackend.flush();
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});

});