(function () {
    "use strict";

    var module = angular.module("adUser", ['ngComponentRouter', 'ngAria', 'ngMaterial', 'ngMessages', 'md.data.table']);

    module.value("$routerRootComponent", "userApp");



    module.config(['$compileProvider', '$mdThemingProvider', function ($compileProvider, $mdThemingProvider) {
        'use strict';
    
        $compileProvider.debugInfoEnabled(false);
    
        $mdThemingProvider.theme('default')
            .primaryPalette('blue', {
                'default': '400', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })
          .primaryPalette('blue')
          .accentPalette('pink');
    }]);




}());