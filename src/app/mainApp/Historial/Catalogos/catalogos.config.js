/**
 * Created by franciscojaviercerdamartinez on 24/09/16.
 */
(function () {
    angular
        .module('app.mainApp.catalogos')
        .config(moduleConfig);

    function moduleConfig($stateProvider, triMenuProvider) {
        triMenuProvider.addMenu({
                name: 'Catalogos',
                icon:'fa fa-archive',
                type: 'dropdown',
                children: [{
                    name: 'Catálogo de Vacunas',
                    state: 'triangular.admin-default.carnetreview',
                    type: 'link'
                },{
                    name: 'Catálogo de Enfermedades',
                    state: 'triangular.admin-default.unidades',
                    type: 'link'
                },{
                    name: 'Cátalogo de Alergias',
                    state: 'triangular.admin-default.carnetreview',
                    type: 'link'
                }

                ]

        });


    }

})();