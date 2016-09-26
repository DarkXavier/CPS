/**
 * Created by Emmanuel on 25/09/2016.
 */
(function ()
{
    'use_strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('vacunasController', vacunasController);

    function vacunasController(Vacunas, toastr, $scope, $mdDialog) {
        var vm = this;


        //Functions
        vm.create = create;
        vm.update = update;
        vm.remove = remove;
        vm.search = search;
        vm.clear = clear;
        vm.selectedItemChange=selectedItemChange;
        vm.clickCopy=clickCopy;

        vm.vaccines = null;
        vm.filteredVaccines = [];
        vm.vaccine = null;
        vm.selectedVaccine=null;
        vm.searchParameter='';
        vm.tipos=[
            "Unica",
            "Varias"
        ];
        activate();

        function activate() {
            /*vm.successTitle=Translate.translate('Vaccines.Notify.Success');
            vm.errorTitle=Translate.translate('Vaccines.Notify.Error');
            vm.warningTitle=Translate.translate('Vaccines.Notify.Warning');
            vm.listErrorMessage=Translate.translate('Vaccines.Notify.Messages.ERROR_GETTING_PROJECTS');
            vm.errorCreate=Translate.translate('Vaccines.Notify.Messages.ERROR_CREATING_PROJECT');
            vm.succesCreate=Translate.translate('Vaccines.Notify.Messages.SUCCESS_CREATING_PROJECT');
            vm.errorRemove=Translate.translate('Vaccines.Notify.Messages.ERROR_REMOVING_PROJECT');
            vm.successRemove=Translate.translate('Vaccines.Notify.Messages.SUCCESS_REMOVING_PROJECT');
            vm.errorUpdate=Translate.translate('Vaccines.Notify.Messages.ERROR_UPDATING_PROJECT');
            vm.successUpdate=Translate.translate('Vaccines.Notify.Messages.SUCCESS_UPDATING_PROJECT');*/
            vm.successTitle="Éxito";
            vm.errorTitle="Error";
            vm.listErrorMessage="Error al obtener listado de vacunas";
            vm.errorCreate="Error al crear vacunas";
            vm.succesCreate="Éxito al crear vacuna";
            vm.errorRemove="Error al eliminar vacuna";
            vm.successRemove="Éxito al eliminar vacuna";
            vm.errorUpdate="Error al actualizar vacuna";
            vm.successUpdate="Éxito al actualizar vacuna";
            vm.vaccines=Vacunas.list();
            console.log(vm.vaccines);
            vm.filteredVaccines=vm.vaccines;
        }

        function create() {
            Vacunas.create(vm.vaccine).then(function(res){
                toastr.success(vm.succesCreate,vm.successTitle);
                vm.selectedVaccine=null;
                vm.vaccines=Vacunas.list();
                vm.filteredVaccines=vm.vaccines;
                $scope.formVaccine.$setPristine();
                $scope.formVaccine.$setUntouched();
            }).catch(function(err){
                toastr.error(vm.errorCreate,vm.errorTitle);
            });
        }

        function update() {
            Vacunas.update(vm.vaccine).then(function(res){
                toastr.success(vm.successUpdate,vm.successTitle);
                vm.vaccines=Vacunas.list();
                vm.clear();
            }).catch(function(err){
                toastr.error(vm.errorUpdate,vm.errorTitle);
            });
        }

        function remove() {
            var confirm = $mdDialog.confirm()
                .title('Confirmación para eliminar')
                .textContent('¿Esta seguro de eliminar este elemento?')
                .ariaLabel('Lucky day')
                .ok('Aceptar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                Vacunas.remove(vm.vaccine).then(function(res){
                    toastr.success(vm.successRemove,vm.successTitle);
                    $scope.formVaccine.$setPristine();
                    $scope.formVaccine.$setUntouched();
                    vm.vaccines=Vacunas.list();
                    vm.filteredVaccines=vm.vaccines;
                    vm.selectedVaccine=null;
                    vm.vaccine=null;
                }).catch(function(err){
                    toastr.error(vm.errorRemove,vm.errorTitle);
                    console.log(err);
                });
            }, function() {

            });


        }

        function search(text) {
            vm.filteredVaccines = _.filter(vm.vaccines, function (item) {
                return item.nombre.toLowerCase().includes(text.toLowerCase());
            });
            return vm.filteredVaccines;
        }

        function clear() {
            vm.vaccine = null;
            vm.selectedVaccine=null;
            $scope.formVaccine.$setPristine();
            $scope.formVaccine.$setUntouched();
            $scope.formVaccine.$invalid=true;
        }

        function selectedItemChange(item) {
            vm.selectedVaccine = item;
            vm.vaccine=angular.copy(vm.selectedVaccine);
            $scope.formVaccine.$invalid=true;
        }

        function clickCopy(item){
            vm.vaccine=angular.copy(item);
            vm.selectedVaccine=null;
            console.log(vm.vaccine);
        }

    }

})();
