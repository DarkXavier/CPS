/**
 * Created by francisco javier cerda martinez on 09/24/16.
 */
(function()
{
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('AlergiaAsignacionController',AlergiaAsignacionController)
        .filter('personaSearch', personaSearch);

    /* @ngInject */
    function AlergiaAsignacionController(Persona,Alergia,$scope, toastr, Translate,PersonaAlergia) {

        var vm = this;

        vm.lookup = lookup;
        vm.querySearch = querySearch;
        vm.selectedItems = selectedItems;
        vm.cancel = cancel;
        vm.remove=remove;
        vm.create=create;
        vm.changeAlergia=changeAlergia;
        vm.enable=enable;
        vm.search_items = [];
        vm.searchText = '';
        vm.disabled=true;
        var alergia = {
            nombre: null,
            descripcion: null
        };
        vm.alergia = angular.copy(alergia);
        vm.numberBuffer = '';
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
        function changeAlergia() {

        }

        function activate() {
            vm.personas=Persona.list();
            vm.alergias=Alergia.list();
        }
        function enable() {
            vm.disabled=false;
        }
        function remove(ev,index) {

            var alergia=_.findWhere(vm.alergias, {
                nombre: ev
            });
            var alergiaPerson=_.findWhere(vm.alergiasPersona, {
                alergia_name: ev
            });
            delete  alergiaPerson.alergia_name;
            alergiaPerson.alergia=alergia.id;
            PersonaAlergia.remove(alergiaPerson).then(function (res) {
                    toastr.success(vm.successDeleteMessage, vm.successTitle);
                obtenerAlergias();
                cancel();
                }).catch(function (res) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });

        }
        function create() {
            var request={
                alergia:  vm.selectedAlergia.id,
                persona: vm.selectedList.id,
                fecha: moment()
            };
            PersonaAlergia.create(request).then(function (res) {
                toastr.success(vm.successCreateMessage, vm.successTitle);
                obtenerAlergias();
                cancel();

            }).catch(function (res) {
                console.log(res);
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }
        function cancel() {
            $scope.AsignacionAlergia.$setPristine();
            $scope.AsignacionAlergia.$setUntouched(); 
            vm.disabled=true;
        }

        function selectedItems(project) {
            vm.selectedList = project;
            vm.alergia = angular.copy(project);
            vm.alergiaPersona=[];
            obtenerAlergias();
        }
        function obtenerAlergias() {
            Alergia.getAlergiasByPerson(vm.selectedList).then(function (res) {
                vm.alergiasPersona=res;
                res.forEach(function (value) {
                    vm.alergiaPersona.push(value.alergia_name);
                });
            });
        }

        function querySearch(query) {
            var results = query ? lookup(query) : vm.alergias;
            return results;

        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.alergias, function (item) {
                return item.nombre.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
        }

    }
    function personaSearch() {
        return function (input, text) {
            if (!angular.isString(text) || text === '') {
                return input;
            }

            return _.filter(input, function (item) {
                return item.nombre.toLowerCase().indexOf(text.toLowerCase()) >= 0;
            });

        };
    }


})();
