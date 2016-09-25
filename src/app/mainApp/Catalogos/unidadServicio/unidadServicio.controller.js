/**
 * Created by francisco javier cerda martinez on 09/24/16.
 */
(function()
{
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('UnidadServicioController',UnidadServicioController)
        .filter('unidadSearch', custom);

    /* @ngInject */
    function UnidadServicioController(UnidadServicio,$scope, toastr, Translate,$mdDialog,OAuth) {

        var vm = this;

        vm.lookup = lookup;
        vm.querySearch = querySearch;
        vm.selectedItems = selectedItems;
        vm.showRegister=showRegister;
        vm.cancel = cancel;
        vm.create = create;
        vm.remove=remove;
        vm.update=update;
        vm.search_items = [];
        vm.searchText = '';
        var unidadServicio = {
            nombre: null,
            direccion: null,
            descripcion: null
        };
        vm.unidadServicio = angular.copy(unidadServicio);
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
            loginClick();
        }
        function loginClick() {
        }

        function activate() {
            vm.unidades_servicio=UnidadServicio.list();
        }
        function showRegister($event) {
            clearForm();
        }
        function remove(ev) {
            var confirm = $mdDialog.confirm()
                .title('Confirmación para eliminar')
                .textContent('¿Esta seguro de eliminar este elemento?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Aceptar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                UnidadServicio.remove(vm.unidadServicio).then(function (res) {
                    toastr.success(vm.successDeleteMessage, vm.successTitle);
                    cancel();
                    activate();
                }).catch(function (res) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }, function() {

            });
        }
        function update() {
            UnidadServicio.update(vm.unidadServicio).then(function (res) {
                toastr.success(vm.successUpdateMessage, vm.successTitle);
                cancel();
                activate();
            }).catch(function (res) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }
        function create() {
            UnidadServicio.create(vm.unidadServicio).then(function (res) {
                toastr.success(vm.successCreateMessage, vm.successTitle);
                vm.unidadServicio = angular.copy(unidadServicio);
                cancel();
                activate();
            }).catch(function (res) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }

        function cancel() {
            $scope.UnidadForm.$setPristine();
            $scope.UnidadForm.$setUntouched();
            vm.unidadServicio = angular.copy(unidadServicio);
            vm.selectedList = null;
        }

        function selectedItems(project) {
            vm.selectedList = project;
            vm.unidadServicio = angular.copy(project);
        }

        function querySearch(query) {
            var results = query ? lookup(query) : vm.unidades_servicio;
            return results;

        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.unidades_servicio, function (item) {
                return item.nombre.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
        }

    }

    function custom() {
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
