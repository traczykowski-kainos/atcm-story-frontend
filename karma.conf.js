module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/underscore/underscore-min.js',
      'app/app.js',
      'app/components/**/*.js',
      'app/shopProducts/shopProductsModule.js',      
      'app/shopProducts/**/*.js',
      'app/shoppingCart/shoppingCartModule.js',      
      'app/shoppingCart/**/*.js',
      'app/services/uniqueIdService.js',
      'app/services/uniqueIdService.spec.js',
      'app/directives/shoppingCartSummary.js',
      'app/services/shopProductsService.js',
      'app/services/shopProductsService.spec.js',
      'app/services/shoppingCartService.js',
      'app/services/shoppingCartService.spec.js',
      'app/directives/shoppingCartSummary.js',
      'app/directives/shoppingCartSummary.spec.js'
    ],

    autoWatch : true,
    singleRun : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-jasmine', 
            'karma-phantomjs-launcher'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
