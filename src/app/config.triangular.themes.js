(function() {
    'use strict';

    angular
        .module('app')
        .config(themesConfig);

    /* @ngInject */
    function themesConfig ($mdThemingProvider, triThemingProvider, triSkinsProvider) {
        /**
         *  PALETTES
         */
        $mdThemingProvider.definePalette('white', {
            '50': 'ffffff',
            '100': 'ffffff',
            '200': 'ffffff',
            '300': 'ffffff',
            '400': 'ffffff',
            '500': 'ffffff',
            '600': 'ffffff',
            '700': 'ffffff',
            '800': 'ffffff',
            '900': 'ffffff',
            'A100': 'ffffff',
            'A200': 'ffffff',
            'A400': 'ffffff',
            'A700': 'ffffff',
            'contrastDefaultColor': 'dark'
        });

        $mdThemingProvider.definePalette('black', {
            '50': '#eceff1',
            '100': '#cfd8dc',
            '200': '#b0bec5',
            '300': '#90a4ae',
            '400': '#78909c',
            '500': '#75263C',
            '600': '#546e7a',
            '700': '#455a64',
            '800': '#37474f',
            '900': '#263238',
            'A100': '#cfd8dc',
            'A200': '#b0bec5',
            'A400': '#78909c',
            'A700': '#455a64',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 A100 A200',
            'contrastStrongLightColors': '400 500 700'
        });
        $mdThemingProvider.definePalette('ipn', {
            '50': '75263C',
            '100': '75263C',
            '200': '75263C',
            '300': '75263C',
            '400': '75263C',
            '500': '75263C',
            '600': '75263C',
            '700': '75263C',
            '800': '75263C',
            '900': '75263C',
            'A100': '75263C',
            'A200': 'ffffff',
            'A400': 'ffffff',
            'A700': 'ffffff',
            'contrastDefaultColor': 'light',
            'contrastStrongLightColors': '50 100 200 300 A100',
            'contrastDarkColors': 'A200 A400 A700'
        });


        var triCyanMap = $mdThemingProvider.extendPalette('cyan', {
            'contrastDefaultColor': 'light',
            'contrastLightColors': '500 700 800 900',
            'contrastStrongLightColors': '500 700 800 900'
        });


        // Register the new color palette map with the name triCyan
        $mdThemingProvider.definePalette('triCyan', triCyanMap);

        /**
         *  SKINS
         */

        // CYAN CLOUD SKIN
        triThemingProvider.theme('cyan')
        .primaryPalette('triCyan')
        .accentPalette('amber')
        .warnPalette('deep-orange');

        triThemingProvider.theme('default')
        .primaryPalette('white')
        .accentPalette('triCyan', {
            'default': '500'
        })
        .warnPalette('deep-orange');

        triSkinsProvider.skin('cyan-cloud', 'Cyan Cloud')
        .sidebarTheme('cyan')
        .toolbarTheme('default')
        .logoTheme('cyan')
        .contentTheme('cyan');

        // RED DWARF SKIN
        triThemingProvider.theme('red')
        .primaryPalette('purple')
        .accentPalette('amber')
        .warnPalette('purple');

        triThemingProvider.theme('white-red')
        .primaryPalette('white')
        .accentPalette('purple', {
            'default': '500'
        })
        .warnPalette('purple');

        triSkinsProvider.skin('red-dwarf', 'Red Dwarf')
        .sidebarTheme('purple')
        .toolbarTheme('white-red')
        .logoTheme('purple')
        .contentTheme('purple');

        // PLUMB PURPLE SKIN
        triThemingProvider.theme('purple')
        .primaryPalette('purple')
        .accentPalette('deep-orange')
        .warnPalette('amber');

        triThemingProvider.theme('white-purple')
        .primaryPalette('white')
        .accentPalette('purple', {
            'default': '400'
        })
        .warnPalette('deep-orange');

        triSkinsProvider.skin('plumb-purple', 'Plumb Purple')
        .sidebarTheme('purple')
        .toolbarTheme('white-purple')
        .logoTheme('purple')
        .contentTheme('purple');

        // DARK KNIGHT SKIN
        triThemingProvider.theme('dark')
        .primaryPalette('ipn', {
            'default': '300',
            'hue-1': '400'
        })
        .accentPalette('amber')
        .warnPalette('deep-orange')
        .backgroundPalette('ipn')
        .dark();


        triSkinsProvider.skin('dark-knight', 'Dark Knight')
        .sidebarTheme('dark')
        .toolbarTheme('dark')
        .logoTheme('dark')
        //IPN
        triThemingProvider.theme('IPN')
            .primaryPalette('ipn', {
                'default': '300',
                'hue-1': '400'
            })
            .accentPalette('amber')
            .warnPalette('deep-orange')
            .backgroundPalette('ipn')
            .dark();


        triSkinsProvider.skin('politecnico', 'Politecnico')
            .sidebarTheme('IPN')
            .toolbarTheme('IPN')
            .logoTheme('IPN')



        // BATTLESHIP GREY SKIN
        triThemingProvider.theme('blue-grey')
        .primaryPalette('blue-grey')
        .accentPalette('amber')
        .warnPalette('orange');

        triThemingProvider.theme('white-blue-grey')
        .primaryPalette('white')
        .accentPalette('blue-grey', {
            'default': '400'
        })
        .warnPalette('orange');

        triSkinsProvider.skin('battleship-grey', 'Battleship Grey')
        .sidebarTheme('blue-grey')
        .toolbarTheme('white-blue-grey')
        .logoTheme('blue-grey')
        .contentTheme('blue-grey');

        // ZESTY ORANGE SKIN
        triThemingProvider.theme('orange')
        .primaryPalette('orange' , {
            'default': '800'
        })
        .accentPalette('lime')
        .warnPalette('amber');

        triThemingProvider.theme('white-orange')
        .primaryPalette('white')
        .accentPalette('orange', {
            'default': '500'
        })
        .warnPalette('lime');

        triSkinsProvider.skin('zesty-orange', 'Zesty Orange')
        .sidebarTheme('orange')
        .toolbarTheme('white-orange')
        .logoTheme('orange')
        .contentTheme('orange');


        // INDIGO ISLAND SKIN
        triThemingProvider.theme('indigo')
        .primaryPalette('indigo' , {
            'default': '600'
        })
        .accentPalette('red')
        .warnPalette('lime');

        triSkinsProvider.skin('indigo-island', 'Indigo Island')
        .sidebarTheme('indigo')
        .toolbarTheme('indigo')
        .logoTheme('indigo')
        .contentTheme('indigo');

        // KERMIT GREEN SKIN
        triThemingProvider.theme('light-green')
        .primaryPalette('light-green' , {
            'default': '400'
        })
        .accentPalette('amber')
        .warnPalette('deep-orange');

        triThemingProvider.theme('white-light-green')
        .primaryPalette('white')
        .accentPalette('light-green', {
            'default': '400'
        })
        .warnPalette('deep-orange');

        triSkinsProvider.skin('kermit-green', 'Kermit Green')
        .sidebarTheme('light-green')
        .toolbarTheme('white-light-green')
        .logoTheme('light-green')
        .contentTheme('light-green');


        /**
         *  FOR DEMO PURPOSES ALLOW SKIN TO BE SAVED IN A COOKIE
         *  This overrides any skin set in a call to triSkinsProvider.setSkin if there is a cookie
         *  REMOVE LINE BELOW FOR PRODUCTION SITE
         */
        triSkinsProvider.useSkinCookie(true);

        /**
         *  SET DEFAULT SKIN
         */
        triSkinsProvider.setSkin('politecnico');
    }
})();