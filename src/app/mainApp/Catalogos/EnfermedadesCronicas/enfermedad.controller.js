/**
 * Created by francisco javier cerda martinez on 09/24/16.
 */
(function()
{
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('EnfermedadController',EnfermedadController);

    function EnfermedadController(Enfermedad,$scope, toastr, Translate,$mdDialog) {

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
        var enfermedad = {
            nombre: null,
            descripcion: null
        };
        vm.enfermedad = angular.copy(enfermedad);
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
            vm.enfermedades=Enfermedad.list();
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
                Enfermedad.remove(vm.enfermedad).then(function (res) {
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
            Enfermedad.update(vm.enfermedad).then(function (res) {
                toastr.success(vm.successUpdateMessage, vm.successTitle);
                cancel();
                activate();
            }).catch(function (res) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }
        function create() {
            Enfermedad.create(vm.enfermedad).then(function (res) {
                toastr.success(vm.successCreateMessage, vm.successTitle);
                vm.enfermedad = angular.copy(enfermedad);
                cancel();
                activate();
            }).catch(function (res) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }

        function cancel() {
            $scope.EnfermedadForm.$setPristine();
            $scope.EnfermedadForm.$setUntouched();
            vm.enfermedad = angular.copy(enfermedad);
            vm.selectedList = null;
        }

        function selectedItems(project) {
            vm.selectedList = project;
            vm.enfermedad = angular.copy(project);
        }

        function querySearch(query) {
            var results = query ? lookup(query) : vm.enfermedades;
            return results;

        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.enfermedades, function (item) {
                return item.nombre.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
        }

    }


})();