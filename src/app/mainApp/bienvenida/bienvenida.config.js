/**
 * Created by franciscojaviercerdamartinez on 02/06/16.
 */
(function () {
    'use strict';
    angular
        .module('app.mainApp.bienvenida')
        .config(moduleConfig);

    function moduleConfig($stateProvider,$translatePartialLoaderProvider){
        $translatePartialLoaderProvider.addPart('app/mainApp/bienvenida');
        $stateProvider.state('triangular.admin-default.bienvenida', {
                url: '/bienvenida',
                data: {
                    roles: ['Administrador','Medico','Paciente']
                },
                templateUrl: 'app/mainApp/bienvenida/index.tmpl.html',
                controller: 'bienvenidaController',
                controllerAs: 'vm'
            })
    }

} )();
