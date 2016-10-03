/**
 * Created by franciscojaviercerdamartinez on 17/08/16.
 */

(function(){
    'use strict';

    angular
        .module('app.mainApp.historial')
        .controller('carnetreviewController', carnetreviewController);

    function carnetreviewController($timeout, $q, $log,Vacunas,Enfermedad,Persona,PersonaMedicos,Alergia,Translate,Session) {
        var vm = this;
        //Funciones
        vm.editing=true;
        vm.querySearch = querySearch;
        vm.pacientes = [];
        vm.verMas = verMas;
        vm.cancel = cancel;
        vm.enable=enable;
        vm.buscar=buscar;
        vm.obtenerCarnet=obtenerCarnet;
        vm.show=false;
        //Variables
        vm.search_items = [];
        vm.selectedItem = null;
        vm.searchText = null;
        vm.enfermedadPersona=[];
        vm.vacunaPersona=[];
        vm.datosMedicos;
        vm.alergiaPersona=[];
        vm.searchText = '';
        var enfermedad = {
            nombre: null,
            descripcion: null
        };
        vm.enfermedad = angular.copy(enfermedad);
        vm.numberBuffer = '';
        vm.disabled=true;
        activate();
        init();

        function querySearch(query) {
            return query ? lookup(query) :vm.pacientes;
        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.pacientes, function (item) {
                return item.boleta_empleado.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
        }


        function init() {
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.SUCESSS_TRANSPORTE_MESSAGE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.successUpdateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_UPDATE');
            vm.successDeleteMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_DELETE');
            if(vm.isPacient){
                vm.selectedPacient=Persona.get();
                vm.selectedPacient.fecha_nacimiento=moment(vm.selectedPacient.fecha_nacimiento).format('DD-MM-YYYY');
                vm.obtenerCarnet(vm.selectedPacient);
            }else {
                Persona.listEsp().then(function (res) {
                    vm.pacientes= _.filter(res, function (item) {
                        return !(item.id == Session.userInformation.id);
                    });
                });

            }

        }


        function activate() {
            vm.enfermedades=Enfermedad.list();
            vm.alergias=Alergia.list();
            vm.vacunas=Vacunas.list();
            vm.personas=Persona.list();
        }
        function enable() {
            vm.disabled=false;
        }


        function cancel() {
            vm.show=false;
            //Variables
            vm.search_items = [];
            vm.selectedItem = null;
            vm.searchText = null;
            vm.enfermedadPersona=[];
            vm.vacunaPersona=[];
            vm.datosMedicos=null;
            vm.alergiaPersona=[];
            vm.searchText = '';
            var enfermedad = {
                nombre: null,
                descripcion: null
            };
            vm.enfermedad = angular.copy(enfermedad);
            vm.numberBuffer = '';
            vm.disabled=true;
        }
        function buscar(){
            PersonaMedicos.getMedicosByPerson(persona).then(function (res) {
                vm.datosMedicos=res;
            })

        };
        function verMas(persona) {
            obtenerAlergias(persona);
            obtenerVacunas(persona);
            obtenerEnfermededaes(persona);
            obtenerCarnet(persona);
            vm.show=true;
            console.log(vm.vacunaPersona);
            console.log(vm.enfermedadPersona);
        }
        function obtenerEnfermededaes(persona) {
            vm.enfermedadPersona=[];
            Enfermedad.getEnfermedadesByPerson(persona).then(function (res) {
                vm.enfermedadPersona=res;
                res.forEach(function (value) {
                    vm.enfermedadPersona.push(value.enfermedad_name);
                });

            });
        }
        function obtenerAlergias(persona) {
            vm.alergiaPersona=[];
            Alergia.getAlergiasByPerson(persona).then(function (res) {
                vm.alergiaPersona=res;
                res.forEach(function (value) {
                    vm.alergiaPersona.push(value.enfermedad_name);

                });


            });
        }
        function obtenerVacunas(persona) {
            vm.vacunaPersona=[];
            Vacunas.getVacunasByPerson(persona).then(function (res) {
                vm.vacunaPersona=res;
                res.forEach(function (value) {
                    vm.vacunaPersona.push(value.vacuna_name);
                });

            });
        }
        function obtenerCarnet(persona) {
            persona.id_paciente=persona.boleta_empleado;
            vm.datosMedicos=[];
            Persona.carnet(persona).then(function (res) {
                vm.datosMedicos=res;
                
            });
        }



    }


})();