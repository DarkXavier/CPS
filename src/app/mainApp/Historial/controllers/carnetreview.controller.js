/**
 * Created by franciscojaviercerdamartinez on 17/08/16.
 */

(function(){
    'use strict';

    angular
        .module('app.mainApp.historial')
        .controller('carnetreviewController', carnetreviewController);

    function carnetreviewController($timeout, $q, $log,Vacunas,Enfermedad,Persona,PersonaMedicos,Alergia,Translate) {
        var vm = this;
        //Funciones
        
        vm.querySearch = querySearch;
        vm.querySearch = querySearch;
        vm.selectedItemChange = selectedItemChange;
        vm.searchTextChange = searchTextChange;
        vm.verMas = verMas;
        vm.cancel = cancel;
        vm.enable=enable;
        vm.buscar=buscar;
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
            var results = query ? vm.pacientes.filter(createFilterFor(query)) : vm.pacientes, deferred;

            deferred = $q.defer();
            $timeout(function () {
                deferred.resolve(results);
            }, Math.random() * 1000, false);
            return deferred.promise;
        }

        function searchTextChange(text) {
            $log.info('Texto cambiado a ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Texto cambiado ' + item);
        }

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
            vm.vacunas=Vacunas.list();
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
                console.log(vm.enfermedadPersona);
            });
        }
        function obtenerAlergias(persona) {
            vm.alergiaPersona=[];
            Alergia.getAlergiasByPerson(persona).then(function (res) {
                vm.alergiaPersona=res;
                res.forEach(function (value) {
                    vm.alergiaPersona.push(value.enfermedad_name);
                });
                console.log(vm.alergiaPersona);

            });
        }
        function obtenerVacunas(persona) {
            vm.vacunaPersona=[];
            Vacunas.getEnfermedadesByPerson(persona).then(function (res) {
                vm.vacunaPersona=res;
                res.forEach(function (value) {
                    vm.vacunaPersona.push(value.vacuna_name);
                });
                console.log(vm.vacunaPersona);
            });
        }



    }


})();