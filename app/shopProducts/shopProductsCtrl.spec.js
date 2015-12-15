'use strict';

describe('shop.shopProducts module', function() {

  var mockProducts = [
	  {
	  	id : 1,
	  	name : 'Bronze Bangle'
	  },
	  {
	  	id : 2,
	  	name : 'Titan Bangle'
	  }
  ];

  var defer = {};
  var mockShopProductService = {};
  var mockScope = {};
  var shopProductsCtrl = {};

  beforeEach(module('shop.shopProducts'));

  beforeEach(inject(function($q, $rootScope, $controller) {
  	mockScope = $rootScope.$new();

	mockShopProductService = {
	  	getShopProducts : function() {
	  		defer = $q.defer();	  		
	  		return defer.promise;
	  	}
	}

	shopProductsCtrl = $controller('ShopProductsCtrl', { $scope : mockScope, shopProductsService : mockShopProductService });  
  }));

  describe('ShopProductsCtrl controller', function(){

    it('should be defined and correctly set scope and error variables when products are returned from service', inject(function() {    	    	
  		       
  		// Ensure service returns successful callback.      
        mockScope.$apply(function() {
        	defer.resolve(mockProducts);
        });

        expect(shopProductsCtrl).toBeDefined();
        expect(mockScope.products).toEqual(mockProducts);
        expect(mockScope.error.errorState).toEqual(false);
    }));


    it('should be defined and correctly set scope and error variables when products there is an error retrieving products', inject(function() {    	    	
  		       
  		// Ensure service returns error callback
        mockScope.$apply(function() {
        	defer.reject();
        });

        expect(shopProductsCtrl).toBeDefined();
        expect(mockScope.products).toEqual([]);
        expect(mockScope.error.errorState).toEqual(true);
        expect(mockScope.error.errorMessage).toEqual('An application error has occurred, please try again later.');
    }));
  });
});