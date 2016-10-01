(function () {
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('dynamicMenu', dynamicMenu);

    function dynamicMenu(triMenu, Session) {

        return {
            loadMenu: loadMenu
        };


        function loadMenu() {
            triMenu.menu = [];
            var role = Session.userRole;
            switch (role) {
                case "Administrador":
                    loadAdminMenu();
                    break;
                case "Medico":
                    loadMedicoMenu();
                    break;
                case "Paciente":
                    loadPacienteMenu();
                    break;

                default:
                    triMenu.menu = [];
            }
        }

        function loadAdminMenu() {
            triMenu.menu = [];
            triMenu.menu = [
                {
                    name: 'Servicio Medico',
                    icon: 'fa fa-medkit',
                    type: 'dropdown',
                    priority: 6.1,
                    children: [{
                        name: 'Historia Clinica',
                        icon: 'zmdi zmdi-hospital-alt',
                        type: 'dropdown',
                        priority: 6.1,
                        children: [
                            {
                                name: 'Alergias',
                                state: 'triangular.admin-default.alergias',
                                type: 'link'

                            }, {
                                name: 'Enfermedades Cronico Degenerativas',
                                state: 'triangular.admin-default.enfermedades-asignacion',
                                type: 'link'

                            }, {
                                name: 'Esquema de Vacunación',
                                state: 'triangular.admin-default.vacunas',
                                type: 'link'

                            }, {
                                name: 'Citas Previas',
                                state: 'triangular.admin-default.lastCitas',
                                type: 'link'

                            }, {
                                name: 'Contacto',
                                state: 'triangular.admin-default.datosContacto',
                                type: 'link'

                            }]
                    }, {
                        name: 'Servicio Médico',
                        icon: 'fa fa-stethoscope',
                        type: 'dropdown',
                        priority: 6.1,
                        children: [
                            {
                                name: 'Cita Médica',
                                state: 'triangular.admin-default.citas',
                                type: 'link'

                            }, {
                                name: 'Consulta Médica',
                                state: 'triangular.admin-default.consulta',
                                type: 'link'
                            }, {
                                name: 'Consultas',
                                state: 'triangular.admin-default.consultas-paciente',
                                type: 'link'
                            }
                        ]
                    }]
                },
                {
                    name: 'Administración',
                    icon: 'fa fa-cog',
                    type: 'dropdown',
                    children: [{
                        name: 'Gestión Usuarios',
                        state: 'triangular.admin-default.carnetreview',
                        type: 'link'
                    }, {
                        name: 'Gestión Unidad de Atencion',
                        state: 'triangular.admin-default.unidades',
                        type: 'link'
                    }, {
                        name: 'Gestíon de Consultorios',
                        state: 'triangular.admin-default.carnetreview',
                        type: 'link'
                    }
                    ]
                },
                {
                    name: 'Catalogos',
                    icon: 'fa fa-archive',
                    type: 'dropdown',
                    children: [{
                        name: 'Vacunas',
                        state: 'triangular.admin-default.vacunas',
                        type: 'link'
                    }, {
                        name: 'Enfermedades',
                        state: 'triangular.admin-default.enfermedad',
                        type: 'link'
                    }, {
                        name: 'alergias',
                        state: 'triangular.admin-default.alergia',
                        type: 'link'
                    }, {
                        name: 'Unidades de Servicio',
                        state: 'triangular.admin-default.unidad-servicio',
                        type: 'link'
                    }, {
                        name: 'Unidades Académicas',
                        state: 'triangular.admin-default.unidad-academicas',
                        type: 'link'
                    }]

                },
                {
                    name: 'Atención Rápida',
                    icon: 'fa fa-ambulance',
                    type: 'dropdown',
                    children: [{
                        name: 'Lectura del Carnet',
                        state: 'triangular.admin-default.carnetreview',
                        type: 'link'
                    }]
                }];

        }

        function loadMedicoMenu() {
            triMenu.menu = [];
            triMenu.menu = [
                {
                    name: 'Servicio Medico',
                    icon: 'fa fa-medkit',
                    type: 'dropdown',
                    priority: 6.1,
                    children: [{
                        name: 'Historia Clinica',
                        icon: 'zmdi zmdi-hospital-alt',
                        type: 'dropdown',
                        priority: 6.1,
                        children: [
                            {
                                name: 'Alergias',
                                state: 'triangular.admin-default.alergias',
                                type: 'link'

                            }, {
                                name: 'Enfermedades Cronico Degenerativas',
                                state: 'triangular.admin-default.enfermedades-asignacion',
                                type: 'link'

                            }, {
                                name: 'Esquema de Vacunación',
                                state: 'triangular.admin-default.vacunas',
                                type: 'link'

                            }, {
                                name: 'Citas Previas',
                                state: 'triangular.admin-default.lastCitas',
                                type: 'link'

                            }, {
                                name: 'Contacto',
                                state: 'triangular.admin-default.datosContacto',
                                type: 'link'

                            }]
                    }, {
                        name: 'Servicio Médico',
                        icon: 'fa fa-stethoscope',
                        type: 'dropdown',
                        priority: 6.1,
                        children: [
                            {
                                name: 'Cita Médica',
                                state: 'triangular.admin-default.citas',
                                type: 'link'

                            }, {
                                name: 'Consulta Médica',
                                state: 'triangular.admin-default.consulta',
                                type: 'link'
                            }, {
                                name: 'Consultas',
                                state: 'triangular.admin-default.consultas-paciente',
                                type: 'link'
                            }
                        ]
                    }]
                },
                {
                    name: 'Atención Rápida',
                    icon: 'fa fa-ambulance',
                    type: 'dropdown',
                    children: [{
                        name: 'Lectura del Carnet',
                        state: 'triangular.admin-default.carnetreview',
                        type: 'link'
                    }]
                }
            ];
        }

        function loadPacienteMenu() {
            triMenu.menu = [];
            triMenu.menu = [
                {
                    name: 'Servicio Medico',
                    icon: 'fa fa-medkit',
                    type: 'dropdown',
                    priority: 6.1,
                    children: [{
                        name: 'Historia Clinica',
                        icon: 'zmdi zmdi-hospital-alt',
                        type: 'dropdown',
                        priority: 6.1,
                        children: [
                            {
                                name: 'Alergias',
                                state: 'triangular.admin-default.alergias',
                                type: 'link'

                            }, {
                                name: 'Enfermedades Cronico Degenerativas',
                                state: 'triangular.admin-default.enfermedades-asignacion',
                                type: 'link'

                            }, {
                                name: 'Esquema de Vacunación',
                                state: 'triangular.admin-default.vacunas',
                                type: 'link'

                            }, {
                                name: 'Citas Previas',
                                state: 'triangular.admin-default.lastCitas',
                                type: 'link'

                            }, {
                                name: 'Contacto',
                                state: 'triangular.admin-default.datosContacto',
                                type: 'link'

                            }]
                    }, {
                        name: 'Servicio Médico',
                        icon: 'fa fa-stethoscope',
                        type: 'dropdown',
                        priority: 6.1,
                        children: [
                            {
                                name: 'Cita Médica',
                                state: 'triangular.admin-default.citas',
                                type: 'link'

                            }, {
                                name: 'Consultas',
                                state: 'triangular.admin-default.consultas-paciente',
                                type: 'link'
                            }
                        ]
                    }]
                }];


        }
    }
})();
