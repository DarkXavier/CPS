/**
 * Created by franciscojaviercerdamartinez on 17/08/16.
 */

(function(){
    'use strict';

    angular
        .module('app.mainApp.historial')
        .controller('carnetreviewController', carnetreviewController);

    function carnetreviewController($timeout, $q, $log,Vacunas,Enfermedad,Persona,PersonaMedicos,Alergia) {
        var vm = this;

        vm.lookup = lookup;
        vm.querySearch = querySearch;
        vm.verMas = verMas;
        vm.cancel = cancel;
        vm.enable=enable;
        vm.search_items = [];
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
        function init() {
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.SUCESSS_TRANSPORTE_MESSAGE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.successUpdateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_UPDATE');
            vm.successDeleteMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_DELETE');
        }


        function activate() {
            vm.enfermedades=Enfermedad.list();
            vm.alergias=Alergia.list();
            vm.vacunas=Vacuna.list();
            vm.personas=Persona.list();
        }
        function enable() {
            vm.disabled=false;
        }


        function cancel() {
            $scope.AsignacionEnfermedad.$setPristine();
            $scope.AsignacionEnfermedad.$setUntouched();
            vm.enfermedad = angular.copy(enfermedad);
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
        }
        function obtenerEnfermededaes(persona) {
            vm.enfermedadPersona=[];
            Enfermedad.getEnfermedadesByPerson(persona).then(function (res) {
                vm.enfermedadesPersona=res;
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
                    vm.enfermedadPersona.push(value.enfermedad_name);
                });
            });
        }
        function obtenerVacunas(persona) {
            vm.vacunaPersona=[];
            Vacunas.getEnfermedadesByPerson(persona).then(function (res) {
                vm.vacunaPersona=res;
                res.forEach(function (value) {
                    vm.vacunaPersona.push(value.vacuna_name);
                });
            });
        }

        function querySearch(query) {
            var results = query ? lookup(query) : vm.personas;
            return results;

        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.personas, function (item) {
                return item.nombre.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
        }

    }


})();