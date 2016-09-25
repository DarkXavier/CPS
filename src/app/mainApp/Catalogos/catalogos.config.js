/**
 * Created by franciscojaviercerdamartinez on 24/09/16.
 */
(function () {
    angular
        .module('app.mainApp.catalogos')
        .config(moduleConfig);

    function moduleConfig($stateProvider, triMenuProvider, $translatePartialLoaderProvider) {
        $translatePartialLoaderProvider.addPart('app/mainApp/catalogos');
        $stateProvider
    .state('triangular.admin-default.enfermedad', {
            // set the url of this page
            url: '/lineaTransporte',
            //data: {
              //  roles: ['Administrador']
            //},
            // set the html template to show on this page
            templateUrl: 'app/mainApp/Catalogos/EnfermedadesCronicas/enfermedad.tmpl.html',
            // set the controller to load for this page
            controller: 'EnfermedadController',
            controllerAs: 'vm'
        }).state('triangular.admin-default.unidad-servicio', {
            // set the url of this page
            url: '/unidadServicio',
            //data: {
            //  roles: ['Administrador']
            //},
            // set the html template to show on this page
            templateUrl: 'app/mainApp/Catalogos/unidadServicio/unidadServicio.tmpl.html',
            // set the controller to load for this page
            controller: 'UnidadServicioController',
            controllerAs: 'vm'
        });


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
                    state: 'triangular.admin-default.enfermedad',
                    type: 'link'
                },{
                    name: 'Cátalogo de Alergias',
                    state: 'triangular.admin-default.carnetreview',
                    type: 'link'
                },{
                    name: 'Cátalogo de Unidades de Servicio',
                    state: 'triangular.admin-default.unidad-servicio',
                    type: 'link'
                },{
                    name: 'Cátalogo de Unidades Académicas',
                    state: 'triangular.admin-default.unidad-academicas',
                    type: 'link'
                }

                ]

        });


    }

})();