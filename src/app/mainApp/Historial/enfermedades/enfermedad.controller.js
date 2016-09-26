/**
 * Created by francisco javier cerda martinez on 09/24/16.
 */
(function()
{
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('EnfermedadesAsignacionController',EnfermedadesAsignacionController);

    function EnfermedadesAsignacionController(Persona,PersonaEnfermedad,Enfermedad,$scope, toastr, Translate,$mdDialog) {

        var vm = this;

        vm.lookup = lookup;
        vm.querySearch = querySearch;
        vm.selectedItems = selectedItems;
        vm.cancel = cancel;
        vm.create = create;
        vm.remove=remove;
        vm.enable=enable;
        vm.search_items = [];
        vm.enfermedadPersona=[];
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
            vm.personas=Persona.list();
        }
        function enable() {
            vm.disabled=false;
        }
        function remove(ev,index) {

            var enfermedad=_.findWhere(vm.enfermedades, {
                nombre: ev
            });
            var enfermedadPerson=_.findWhere(vm.enfermedadesPersona, {
                enfermedad_name: ev
            });
            delete  enfermedadPerson.enfermedad_name;
            enfermedadPerson.enfermedad=enfermedad.id;
            PersonaEnfermedad.remove(enfermedadPerson).then(function (res) {
                toastr.success(vm.successDeleteMessage, vm.successTitle);
                obtenerEnfermededaes();
                cancel();
            }).catch(function (res) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });

        }
        function create() {
            var request={
                enfermedad:  vm.selectedEnfermedad.id,
                persona: vm.selectedList.id,
                fecha: moment()
            };
            PersonaEnfermedad.create(request).then(function (res) {
                toastr.success(vm.successCreateMessage, vm.successTitle);
                vm.enfermedad = angular.copy(enfermedad);
                obtenerEnfermededaes();
                cancel();

            }).catch(function (res) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }

        function cancel() {
            $scope.AsignacionEnfermedad.$setPristine();
            $scope.AsignacionEnfermedad.$setUntouched();
            vm.enfermedad = angular.copy(enfermedad);
            vm.disabled=true;
        }

        function selectedItems(project) {
            vm.selectedList = project;
            vm.enfermedad = angular.copy(project);

            obtenerEnfermededaes();
        }
        function obtenerEnfermededaes() {
            vm.enfermedadPersona=[];
            Enfermedad.getEnfermedadesByPerson(vm.selectedList).then(function (res) {
                vm.enfermedadesPersona=res;
                res.forEach(function (value) {
                    vm.enfermedadPersona.push(value.enfermedad_name);
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