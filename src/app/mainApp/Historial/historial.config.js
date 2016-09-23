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

            .state('triangular.admin-default.carnetreview',{
                url:'/carnet',
                templateUrl:'app/mainApp/Historial/carnetreview.tmpl.html',
                controller:'carnetreviewController',
                controllerAs:'vm'
            })



        triMenuProvider.addMenu({
            name: 'Servicio Medico',
            icon: 'fa fa-medkit',
            type: 'dropdown',
            priority: 6.1,
            children: [{
                name: 'Historia Clinica',
                icon:'zmdi zmdi-hospital-alt',
                type: 'dropdown',
                priority: 6.1,
                children:[{
                    name: 'Alergias',
                    state: 'triangular.admin-default.alergias',
                    type: 'link'

                },{
                    name: 'Enfermedades Cronico Degenerativas',
                    state: 'triangular.admin-default.antecedentesPersonales',
                    type: 'link'

                },{
                    name: 'Esquema de Vacunación',
                    state: 'triangular.admin-default.vacunas',
                    type: 'link'

                },{
                    name: 'Citas Previas',
                    state: 'triangular.admin-default.lastCitas',
                    type: 'link'

                },{
                    name: 'Contacto',
                    state: 'triangular.admin-default.datosContacto',
                    type: 'link'

                }]
            }, {
                name: 'Servicio Médico',
                icon:'fa fa-stethoscope',
                type: 'dropdown',
                priority: 6.1,
                children:[{
                    name: 'Cita Médica',
                    state: 'triangular.admin-default.citas',
                    type: 'link'

                },{
                    name: 'Consulta Médica',
                    state: 'triangular.admin-default.consulta',
                    type: 'link'
                }]
            }, {
                name: 'Atención Rápida',
                icon:'fa fa-ambulance',
                type: 'dropdown',
                children: [{
                    name: 'Lectura del Carnet',
                    state: 'triangular.admin-default.carnetreview',
                    type: 'link'
                }]
            },{
                name: 'Administración',
                icon:'fa fa-cog',
                type: 'dropdown',
                children: [{
                    name: 'Gestión Usuarios',
                    state: 'triangular.admin-default.carnetreview',
                    type: 'link'
                },{
                    name: 'Gestión Unidad de Atencion',
                    state: 'triangular.admin-default.unidades',
                    type: 'link'
                },{
                    name: 'Gestíon de Consultorios',
                    state: 'triangular.admin-default.carnetreview',
                    type: 'link'
                },
                ]
            },{
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
                },
                ]
            },
            ]
        });

    }

} )();
