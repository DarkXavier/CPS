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
        })

    .state('triangular.admin-default.vacunas', {
            // set the url of this page
            url: '/vacunas',
            //data: {
            //  roles: ['Administrador']
            //},
            // set the html template to show on this page
            templateUrl: 'app/mainApp/Catalogos/Vacunas/vacunas.tmpl.html',
            // set the controller to load for this page
            controller: 'VacunasController',
            controllerAs: 'vm'
        });

        triMenuProvider.addMenu({
                name: 'Catalogos',
                icon:'fa fa-archive',
                type: 'dropdown',
                children: [{
                    name: 'Catálogo de Vacunas',
                    state: 'triangular.admin-default.vacunas',
                    type: 'link'
                },{
                    name: 'Catálogo de Enfermedades',
                    state: 'triangular.admin-default.enfermedad',
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