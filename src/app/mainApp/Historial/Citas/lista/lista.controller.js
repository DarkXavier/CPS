/**
 * Created by Christian on 24/09/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.historial')
        .controller('ListadoCitasController', ListadoCitasController)
        .filter('citaSearch', custom);

    function ListadoCitasController(UTILS,Agenda, Translate,Persona,Consultorio,UnidadServicio,TipoServicio) {
        var vm = this;

        vm.lookup = lookup;
        vm.querySearch = querySearch;
        vm.selectedItems = selectedItems;
        vm.formatDate=formatDate;
        vm.search_items = [];
        vm.formato="DD-MM-YYYY";
        vm.searchText = '';
        var evento={
            medico:null,
            hora_inicio:null,
            hora_termino:null,
            dia:null,
            consultorio:null,
            unidad_servicio:null,
            tipo_servicio:null
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
            vm.citas=Agenda.getMyCitas();
            vm.personas = Persona.list();
        }

       function formatDate(date){
            var dateOut = new Date(date);
            return dateOut;
        }
        function selectedItems(project) {
            vm.selectedList = project;
            vm.evento.consultorio=Consultorio.get(project.consultorio_horario.consultorio);
            vm.evento.dia=UTILS.week[project.consultorio_horario.dia].value;
            vm.evento.fecha=moment(project.fecha).format(vm.formato);
            vm.evento.hora_inicio=project.hora_inicio;
            vm.evento.hora_termino=project.hora_termino;
            vm.evento.medico=_.find(vm.personas, function(item) {
                return item.id== project.medico;
            });
            vm.evento.medico=vm.evento.medico.nombre+" "+vm.evento.medico.apellido_paterno+" "+vm.evento.medico.apellido_materno;
            UnidadServicio.get(vm.evento.consultorio.unidad_servicio).then(function (res) {
                vm.evento.unidad_servicio=res[0];
            });
            TipoServicio.get(vm.evento.consultorio.tipo_servicio).then(function (res) {
                vm.evento.tipo_servicio=res[0];
            });
        }

        function querySearch(query) {
            var results = query ? lookup(query) : vm.citas;
            return results;

        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.citas, function (item) {
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
