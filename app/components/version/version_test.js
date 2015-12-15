'use strict';

describe('shop.version module', function() {
  beforeEach(module('shop.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
