/**
 * Created by Christian on 24/09/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.historial')
        .controller('ListadoCitasController', ListadoCitasController)
        .filter('eventosSearch', custom);

    function ListadoCitasController( Translate) {
        var vm = this;

        vm.lookup = lookup;
        vm.querySearch = querySearch;
        vm.selectedItems = selectedItems;
        vm.formatDate=formatDate;
        vm.search_items = [];
        vm.searchText = '';
        var evento = {
            consultorio: null,
            unidad_servicio: null,
            fecha:null
        };
        vm.evento = angular.copy(evento);
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

        function activate() {
            //vm.eventos=Alergia.list();
            vm.eventos = [
                {
                    consultorio: 'Consultorio 1',
                    unidad_servicio: 'Zacatenco',
                    fecha: moment().add(1, 'h').format('DD/MM/YYYY HH:mm:ss')
                },
                {
                    consultorio: 'Consultorio 2',
                    unidad_servicio: 'Libre',
                    fecha: moment().add(3, 'h').format('DD/MM/YYYY HH:mm:ss')
                },
                {
                    consultorio: 'Consultorio 3',
                    unidad_servicio: 'Zacatenco',
                    fecha: moment().add(5, 'h').format('DD/MM/YYYY HH:mm:ss')
                },
                {
                    consultorio: 'Consultorio 4',
                    unidad_servicio: 'Libre',
                    fecha: moment().add(7, 'h').format('DD/MM/YYYY HH:mm:ss')
                },
                {
                    consultorio: 'Consultorio 5',
                    unidad_servicio: 'Zacatenco',
                    fecha: moment().add(9, 'h').format('DD/MM/YYYY HH:mm:ss')
                },
                {
                    consultorio: 'Consultorio 6',
                    unidad_servicio: 'Libre',
                    fecha: moment().add(11, 'h').format('DD/MM/YYYY HH:mm:ss')
                }
            ];
        }

       function formatDate(date){
            var dateOut = new Date(date);
            return dateOut;
        }
        function selectedItems(project) {
            vm.selectedList = project;
            vm.evento = angular.copy(project);
        }

        function querySearch(query) {
            var results = query ? lookup(query) : vm.eventos;
            return results;

        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.eventos, function (item) {
                return item.consultorio.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
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
                return item.consultorio.toLowerCase().indexOf(text.toLowerCase()) >= 0;
            });

        };


    }


})();
