/**
 * Created by franciscojaviercerdamartinez on 13/08/16.
 */
(function () {
    'use strict';
    angular
        .module('app.mainApp.historial')
        .config(moduleConfig);

    function moduleConfig($stateProvider, triMenuProvider){
        $stateProvider

            .state('triangular.admin-default.habitus', { //Nombre del state
                url: '/habitus', //Nombre que quiero en mi url
                templateUrl: 'app/mainApp/Historial/habitus.tmpl.html', //Dirección del archivo a usar
                controller: 'habitusController', //nombre del controlador
                controllerAs: 'vm' //se renombra al scope

            })

            .state('triangular.admin-default.signos', { //Nombre del state
                url: '/signos', //Nombre que quiero en mi url
                templateUrl: 'app/mainApp/Historial/signos.tmpl.html', //Dirección del archivo a usar
                controller: 'signosController', //nombre del controlador
                controllerAs: 'vm' //se renombra al scope

            })

            .state('triangular.admin-default.antecedentesFamiliares', { //Nombre del state
                url: '/antecedentes_familiares', //Nombre que quiero en mi url
                templateUrl: 'app/mainApp/Historial/antecedentesFamiliares.tmpl.html', //Dirección del archivo a usar
                controller: 'antecedentesFamiliaresController', //nombre del controlador
                controllerAs: 'vm' //se renombra al scope

            })
            .state('triangular.admin-default.antecedentesPersonales', { //Nombre del state
                url: '/antecedentes_personales', //Nombre que quiero en mi url
                templateUrl: 'app/mainApp/Historial/antecedentesPersonales.tmpl.html', //Dirección del archivo a usar
                controller: 'antecedentesPersonalesController', //nombre del controlador
                controllerAs: 'vm' //se renombra al scope

            })
            .state('triangular.admin-default.consulta',{
                url:'/consulta',
                templateUrl:'app/mainApp/Historial/Consulta.html',
                controller:'consultaController',
                controllerAs:'vm'
            })

            .state('triangular.admin-default.datosContacto',{
                url:'/datosContacto',
                templateUrl:'app/mainApp/Historial/datos_contacto.html',
               // controller:'datosContactoController',
                //controllerAs:'vm'
            })

            .state('triangular.admin-default.indicadores',{
                url:'/indicadores',
                templateUrl:'app/mainApp/Historial/indicador.html',
                controller:'indicadoresController',
                controllerAs:'vm'
            })

            .state('triangular.admin-default.carnetreview',{
                url:'/carnet',
                templateUrl:'app/mainApp/Historial/carnetreview.tmpl.html',
                controller:'carnetreviewController',
                controllerAs:'vm'
            })



        triMenuProvider.addMenu({
            name: 'Historial CLinico',
            icon: 'fa fa-archive',
            type: 'dropdown',
            priority: 6.1,
            children: [{
                name: 'Interrogatorio',
                type: 'dropdown',
                priority: 6.1,
                children:[{
                    name: 'Antecedentes Personales',
                    state: 'triangular.admin-default.antecedentesPersonales',
                    type: 'link'

                },{
                    name: 'Antecedentes Familiares',
                    state: 'triangular.admin-default.antecedentesFamiliares',
                    type: 'link'

                },]
            }, {
                name: 'Exploración Fisica',
                type: 'dropdown',
                priority: 6.1,
                children:[{
                    name: 'Habitus Exterior',
                    state: 'triangular.admin-default.habitus',
                    type: 'link'

                },{
                    name: 'Signos Vitales',
                    state: 'triangular.admin-default.signos',
                    type: 'link'

                },]
            },{
                name: 'Análisis de Laboratorio',
                state: 'triangular.admin-default.analisis',
                type: 'link'
            }, {
                name: 'Eventos Previos',
                state: 'triangular.admin-default.eventosPrevios',
                type: 'link'
            },
                {
                    name: 'Consulta Médica',
                    state: 'triangular.admin-default.consulta',
                    type: 'link'
                }, {
                    name: 'Datos de Contacto',
                    state: 'triangular.admin-default.datosContacto',
                    type: 'link'
                }, {
                    name: 'Indicadores',
                    state: 'triangular.admin-default.indicadores',
                    type: 'link'
                }, {
                    name: 'Lectura del Carnet',
                    state: 'triangular.admin-default.carnetreview',
                    type: 'link'
                }

            ]
        });

    }

} )();
