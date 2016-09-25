/**
 * Created by francisco javier cerda martinez on 09/24/16.
 */
(function()
{
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('EnfermedadController',EnfermedadController);

    function EnfermedadController(Enfermedad, toastr, $scope)
    {
        var vm = this;

        //Variables
        vm.searchText = '';
        vm.search_items = [];
        vm.categoria_list = null;
        vm.categoria = null;

        vm.text = 'Hola';

        //Functions
        vm.lookup = lookup;
        vm.selectedItemChange = selectedItemChange;
        vm.cancel = cancel;
        vm.update = update;
        vm.create = create;
        vm.remove = remove;
        vm.clickRepeater = clickRepeater;

        activate();


        function activate(){

            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_CREATE');
            vm.successUpdateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_UPDATE');
            vm.successDeleteMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_DELETE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.notFoundMessage = Translate.translate('MAIN.MSG.NOT_FOUND');
            vm.notFoundInput=Translate.translate('MAIN.MSG.NOT_FOUND_INPUT');
            vm.errorTypeFile = Translate.translate('MAIN.MSG.ERORR_TYPE_FILE');
            vm.errorSize = Translate.translate('MAIN.MSG.FILE_SIZE');
            listCategorias();
        }

        function listCategorias()
        {
            vm.categoria_list  = Categoria.list();
        }

        function lookup(search_text){
            vm.search_items = _.filter(vm.categoria_list,function(item){
                return item.descripcion.toLowerCase().includes(search_text.toLowerCase()) || item.nombre.toLowerCase().includes(search_text.toLowerCase());
            });
            return vm.search_items;
        }

        function selectedItemChange(item)
        {

        }

        function clickRepeater(categoria){
            vm.categoria = categoria.clone();
        }

        function  cancel(){
            $scope.inputForm.$setPristine();
            vm.categoria = null;
        }

        function update(){
            Enfermedad.update(vm.categoria).then(function(res){
                toastr.success(vm.successUpdateMessage,vm.successTitle);
                listCategorias();
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
        }

        function create()
        {
            Enfermedad.create(vm.categoria).then(function(res){
                listCategorias();
                toastr.success(vm.successCreateMessage,vm.successTitle);
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
        }

        function remove()
        {
            Enfermedad.remove(vm.categoria).then(function(res){
                listCategorias();
                cancel();
                toastr.success(vm.successDeleteMessage,vm.successTitle)
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
        }

    }

})();