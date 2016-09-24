/**
 * Created by franciscojaviercerdamartinez on 24/09/16.
 */
(function () {
    angular
        .module('app.mainApp.quickAtention')
        .config(moduleConfig);

    function moduleConfig($stateProvider, triMenuProvider) {
        triMenuProvider.addMenu({
        
            name: 'Atención Rápida',
                icon:'fa fa-ambulance',
            type: 'dropdown',
            children: [{
            name: 'Lectura del Carnet',
            state: 'triangular.admin-default.carnetreview',
            type: 'link'
        }]

        });


    }

})();