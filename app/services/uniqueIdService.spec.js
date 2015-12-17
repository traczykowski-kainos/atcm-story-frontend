'use strict';

describe('The uniqueIdService', function() {
	
	var uniqueIdService = {};
	var httpBackend = {};
	var mockconfigService = {		
		servicesBaseUrl : 'http://localhost:8080'		
	}

	beforeEach(module('shop'));

	beforeEach(module(function ($provide) {
        $provide.value('configService', mockconfigService);
    }));

	beforeEach(inject(function($httpBackend, $injector) {  	
		uniqueIdService = $injector.get('uniqueIdService');
		httpBackend = $httpBackend;
	}));

	it('should call the correct http endpoint when an new Id is requested', function() {
		// Set expectation of back-end http service being called.
		httpBackend.whenGET('http://localhost:8080/uniqueId').respond(200);		

		// Invoke method which is being tested
		uniqueIdService.getUniqueId();

		// Flush httpBackend calls and verify no outstanding requests.
		httpBackend.flush();
		httpBackend.verifyNoOutstandingExpectation();
     	httpBackend.verifyNoOutstandingRequest();
	});

});