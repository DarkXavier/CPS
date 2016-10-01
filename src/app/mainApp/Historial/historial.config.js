/**
 * Created by franciscojaviercerdamartinez on 22/09/16.
 */
(function () {
    'use strict';
    angular
        .module('app.mainApp.historial')
        .config(moduleConfig);

    function moduleConfig($stateProvider, triMenuProvider) {
        $stateProvider
            .state('triangular.admin-default.antecedentesPersonales', { //Nombre del state
                url: '/antecedentes_personales', //Nombre que quiero en mi url
                templateUrl: 'app/mainApp/Historial/antecedentesPersonales.tmpl.html', //Dirección del archivo a usar
                controller: 'antecedentesPersonalesController', //nombre del controlador
                controllerAs: 'vm' //se renombra al scope
            })
            .state('triangular.admin-default.consulta', {
                url: '/consulta',
                templateUrl: 'app/mainApp/Historial/Consulta.html',
                controller: 'consultaController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.datosContacto', {
                url: '/datosContacto',
                templateUrl: 'app/mainApp/Historial/datos_contacto.html'
            })
            .state('triangular.admin-default.carnetreview', {
                url: '/carnet',
                templateUrl: 'app/mainApp/Historial/carnetreview.tmpl.html',
                controller: 'carnetreviewController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.citas', {
                url: '/citas',
                templateUrl: 'app/mainApp/Historial/Citas/create/citas.tmpl.html',
                controller: 'CitasController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.consultas-paciente', {
                url: '/consultaPacientes',
                templateUrl: 'app/mainApp/Historial/Citas/lista/lista.tmpl.html',
                controller: 'ListadoCitasController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.alergias', {
                url: '/asignacionAlergias',
                templateUrl: 'app/mainApp/Historial/alergias/alergia.tmpl.html',
                controller: 'AlergiaAsignacionController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.enfermedades-asignacion', {
                url: '/asignacionEnfermedades',
                templateUrl: 'app/mainApp/Historial/enfermedades/enfermedad.tmpl.html',
                controller: 'EnfermedadesAsignacionController',
                controllerAs: 'vm'
            });

    }

})();
