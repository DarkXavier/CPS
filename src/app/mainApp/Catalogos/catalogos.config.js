/**
 * Created by franciscojaviercerdamartinez on 24/09/16.
 */
(function () {
    angular
        .module('app.mainApp.catalogos')
        .config(moduleConfig);

    function moduleConfig($stateProvider, $translatePartialLoaderProvider) {
        $translatePartialLoaderProvider.addPart('app/mainApp/Catalogos');
        $stateProvider
            .state('triangular.admin-default.enfermedad', {
                url: '/enfermedad',
                data: {
                    roles: ['Administrador']
                },
                templateUrl: 'app/mainApp/Catalogos/EnfermedadesCronicas/enfermedad.tmpl.html',
                controller: 'EnfermedadController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.vacunas', {
                url: '/vacunas',
                data: {
                    roles: ['Administrador','Medico','Paciente']
                },
                templateUrl: 'app/mainApp/Catalogos/Vacunas/vacunas.tmpl.html',
                controller: 'vacunasController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.unidad-servicio', {
                url: '/unidadServicio',
                data: {
                    roles: ['Administrador']
                },
                templateUrl: 'app/mainApp/Catalogos/unidadServicio/unidadServicio.tmpl.html',
                controller: 'UnidadServicioController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.unidad-academicas', {
                url: '/unidadAcademica',
                data: {
                    roles: ['Administrador']
                },
                templateUrl: 'app/mainApp/Catalogos/unidadAcademica/unidadAcademica.tmpl.html',
                controller: 'UnidadAcademicaController',
                controllerAs: 'vm'

            })
            .state('triangular.admin-default.alergia', {
                url: '/alergia',
                data: {
                    roles: ['Administrador']
                },
                templateUrl: 'app/mainApp/Catalogos/alergia/alergia.tmpl.html',
                controller: 'AlergiaController',
                controllerAs: 'vm'
            });


    }

})();