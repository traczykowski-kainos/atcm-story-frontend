'use strict';

angular.module('shop.version', [
  'shop.version.interpolate-filter',
  'shop.version.version-directive'
])

.value('version', '0.1');
