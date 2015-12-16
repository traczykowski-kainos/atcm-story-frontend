'use strict';

describe('The shoppingCartSummary directive', function() {

	var mockId = 12345;
	var uniqueIdService = {};
	var httpBackend = {};
	var numberOfShoppingCartItems = 1;
	var mockShoppingCartService = {		
		getNumberOfCartItems : function() {
			return numberOfShoppingCartItems;
		}
	}
	var $compile, $rootScope;

	beforeEach(module('shop.shoppingCartSummary'));

	beforeEach(module(function ($provide) {
        $provide.value('shoppingCartService', mockShoppingCartService);
    }));

	beforeEach(inject(function($injector) {  			
		$compile = $injector.get('$compile');
		$rootScope = $injector.get('$rootScope');
	}));

	it('should initialize and display the correct number of items as returned from the shoppingCartService', function() {
		// Compile a piece of HTML containing the directive
    	var element = $compile("<div shopping-cart-summary></div>")($rootScope);

    	// Kick off the digest cycle to ensure directive is compiled
    	$rootScope.$digest();

    	// Assert directive has correct number of items shown (same as returned from shoppingCartService)
    	expect(element.html()).toContain('Cart (1)');
	});

	it('should increment the cart display when the number of items in the cart is increased and the "items updated" event is broadcast', function() {
		// Compile a piece of HTML containing the directive
    	var element = $compile("<div shopping-cart-summary></div>")($rootScope);

    	// Kick off digest cycle and assert cart has 1 item.
    	$rootScope.$digest();
    	expect(element.html()).toContain('Cart (1)');

    	// Increment number of items in cart, broadcast event and assert that cart display has been updated
    	numberOfShoppingCartItems++;
    	$rootScope.$broadcast('itemsUpdated');
    	$rootScope.$digest();

    	expect(element.html()).toContain('Cart (2)');
	});
});