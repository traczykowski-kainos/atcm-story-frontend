'use strict';

describe('shop.shopProducts module', function() {

  var mockProducts = { data : [
	  {
	  	id : 1,
	  	name : 'Bronze Bangle'
	  },
	  {
	  	id : 2,
	  	name : 'Titan Bangle'
	  }
  ]};

  var defer = {};
  var mockShopProductService = {};
  var mockShoppingCartService = {};
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

    mockShoppingCartService = {
      addItemToCart : function(item) { }
    }

	  shopProductsCtrl = $controller('ShopProductsCtrl', { $scope : mockScope, shopProductsService : mockShopProductService, shoppingCartService : mockShoppingCartService });  
  }));

  describe('ShopProductsCtrl controller', function(){

    it('should be defined and correctly set scope and error variables when products are returned from service', inject(function() {    	    	
  		       
  		  // Ensure service returns successful callback.      
        mockScope.$apply(function() {
        	defer.resolve(mockProducts);
        });

        expect(shopProductsCtrl).toBeDefined();
        expect(mockScope.products).toEqual(mockProducts.data);
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

    it('should call service to add product to cart when add function is invoked.', inject(function() {           
             
        mockScope.$apply(function() {
          defer.resolve(mockProducts);
        });

        spyOn(mockShoppingCartService, 'addItemToCart');

        expect(shopProductsCtrl).toBeDefined();
        expect(mockScope.products).toEqual(mockProducts.data);
        expect(mockScope.error.errorState).toEqual(false);
        mockScope.addProductToCart(mockProducts[1]);
        expect(mockShoppingCartService.addItemToCart).toHaveBeenCalledWith(mockProducts[1]);
    }));

    it('should set error variables correctly when adding item to cart throws and error.', inject(function() {           
             
        mockScope.$apply(function() {
          defer.resolve(mockProducts);
        });

        spyOn(mockShoppingCartService, 'addItemToCart').and.throwError("Error");

        expect(shopProductsCtrl).toBeDefined();
        expect(mockScope.products).toEqual(mockProducts.data);
        expect(mockScope.error.errorState).toEqual(false);
        mockScope.addProductToCart(mockProducts[1]);
        expect(mockShoppingCartService.addItemToCart).toHaveBeenCalledWith(mockProducts[1]);
        expect(mockScope.error.errorState).toEqual(true);
        expect(mockScope.error.errorMessage).toEqual('There was an error adding the item to your cart, please try again later.');
    }));
  });
});