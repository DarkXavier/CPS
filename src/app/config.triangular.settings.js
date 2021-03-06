(function() {
    'use strict';

    angular
        .module('app')
        .config(translateConfig);

    /* @ngInject */
    function translateConfig(triSettingsProvider, triRouteProvider) {
        var now = new Date();
        // set app name & logo (used in loader, sidemenu, footer, login pages, etc)
        triSettingsProvider.setName('Carnet Politécnico');
        triSettingsProvider.setCopyright('&copy;' + now.getFullYear() + ' Instituto Politécnico Nacional');
        triSettingsProvider.setLogo('assets/images/logo2.png');
        // set current version of app (shown in footer)
        triSettingsProvider.setVersion('0.1');
        // set the document title that appears on the browser tab
        triRouteProvider.setTitle('Carnet Politécnico');
        triRouteProvider.setSeparator('|');
    }
})();
