'use strict';

describe('shop.shoppingCart module', function() {

	// Mock items
	var mockBronzeBangle = {
	  	id : 1,
	  	name : 'Bronze Bangle'
	};

	var mockTitanBangle = {
	  	id : 2,
	  	name : 'Titan Bangle'
	};

	// Create mock shopping cart item list and push items to it.
	var mockShoppingCartItems = [];
	mockShoppingCartItems.push(mockBronzeBangle);
	mockShoppingCartItems.push(mockBronzeBangle);
	mockShoppingCartItems.push(mockBronzeBangle);
	mockShoppingCartItems.push(mockTitanBangle);	
  
    var expectedDisplayItems = [
  	  {
	  	id : 1,
	  	name : 'Bronze Bangle',
	  	quantity : 3
	  },
	  {
	  	id : 2,
	  	name : 'Titan Bangle',
	  	quantity : 1
	  }
    ];

    var mockScope = {};
    var shoppingCartCtrl = {};
    var mockShoppingCartService = {};

    beforeEach(module('shop.shoppingCart'));

    beforeEach(inject(function($rootScope, $controller) {  	
  	  mockScope = $rootScope.$new();

      mockShoppingCartService = {
        getCartItems : function() { return mockShoppingCartItems; },
        removeItemFromCart : function(item) { }
      }

      spyOn(mockShoppingCartService, 'removeItemFromCart');

	  shoppingCartCtrl = $controller('ShoppingCartCtrl', { $scope : mockScope, shoppingCartService : mockShoppingCartService });  
    }));

    describe('ShoppingCartCtrl controller', function(){

	    it('should be defined and should set display items and quantities correctly', inject(function() {    	
	        expect(shoppingCartCtrl).toBeDefined();
	        expect(mockScope.displayItems).toEqual(expectedDisplayItems);
	    }));

		it('should call removeItemFromCart on shoppingCartService when item has quantity', inject(function() {    	
	        expect(shoppingCartCtrl).toBeDefined();
	        expect(mockScope.displayItems).toEqual(expectedDisplayItems);

	        mockScope.removeItemFromCart(expectedDisplayItems[0]);
	        expect(mockShoppingCartService.removeItemFromCart).toHaveBeenCalledWith(mockBronzeBangle);
	    }));	    

		it('should only allow one calls to service to remove mockItem2 - Titan Bangle', inject(function() {    	
	        expect(shoppingCartCtrl).toBeDefined();
	        expect(mockScope.displayItems).toEqual(expectedDisplayItems);

	        mockScope.removeItemFromCart(expectedDisplayItems[1]);
	        expect(mockShoppingCartService.removeItemFromCart).toHaveBeenCalledWith(mockTitanBangle);

	        mockScope.removeItemFromCart(expectedDisplayItems[1]);
			expect(mockShoppingCartService.removeItemFromCart).not.toHaveBeenCalledWith();
	    }));	    
  });
});