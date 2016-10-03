/**
 * Created by Christian on 24/09/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.historial')
        .controller('CitasController', CitasController);

    function CitasController(UnidadServicio,TipoServicio,Agenda,Consultorio, $mdDialog,Session,$log, $rootScope,triTheming , Persona, $mdToast, $filter, triLayout, uiCalendarConfig) {
        var vm = this;
        vm.pacientes = [];
        vm.fecha_inicio = null;
        vm.isPacient=Session.userRole==="Paciente";
        vm.fecha_fin = null;
        vm.calendarOptions = {
            defaultView: 'agendaWeek',
            contentHeight: 'auto',
            selectable: true,
            editable: false,
            header: false,
            lang: 'es-mx',
            timeFormat: ' ',
            viewRender: function (view) {
                // change day
                vm.currentDay = view.calendar.getDate();
                vm.currentView = view.name;
                // update toolbar with new day for month name
                $rootScope.$broadcast('calendar-changeday', vm.currentDay);
                // update background image for month
                triLayout.layout.contentClass = 'calendar-background-image background-overlay-static overlay-gradient-10';

            },
            dayClick: function (date, jsEvent, view) { //eslint-disable-line
                vm.currentDay = date;
            },
            eventClick: function (calEvent, jsEvent, view) { //eslint-disable-line
                console.log(calEvent);
                var confirm = $mdDialog.confirm()
                    .title('Confirmación para cita')
                    .textContent('¿Esta seguro de seleccionar este horario?')
                    .ariaLabel('Lucky day')
                    .targetEvent(jsEvent)
                    .ok('Aceptar')
                    .cancel('Cancelar');
                $mdDialog.show(confirm).then(function() {
                    Agenda.create(calEvent.consultorio).then(function (res) {
                        clear();
                        $mdToast.show(
                            $mdToast.simple()
                                .content($filter('triTranslate')("Se ha confirmado tu cita con éxito "))
                                .position('bottom right')
                                .hideDelay(2000)
                        );
                    }).catch(function (res) {
                        console.log(res);
                    });

                }, function() {

                });
            }
        };

        vm.consultorios = [];
        vm.unidad_servicio = [];
        vm.tipo_unidad_servicio = [];
        vm.eventos = [];


        //uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('changeView', 'agendaWeek');
        vm.selectedItem = null;
        vm.searchText = null;
        vm.showCalendar = false;
        vm.viewFormats = {
            'month': 'MMMM YYYY',
            'agendaWeek': 'w',
            'agendaDay': 'Do MMMM YYYY'
        };

        vm.eventSources = [{
            events: []
        }];
        init();

        vm.querySearch = querySearch;
        vm.selectedItemChange = selectedItemChange;
        vm.searchTextChange = searchTextChange;
        vm.unidadSelect=unidadSelect;
        vm.changeMonth = changeMonth;
        vm.buscar = buscar;
        vm.eliminar=eliminar;

        //////////////////
        function eliminar(dato) {
            var arr=angular.copy(vm.eventSources[0].events);
            arr= _.without(arr, _.findWhere(arr, {
                _id: dato
            }));

            vm.eventSources[0].events.splice(0, vm.eventSources[0].events.length);
            vm.eventSources[0].events=arr;
            uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('refetchEvents');
            uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('render')

        }

        function searchTextChange(text) {
            $log.info('Texto cambiado a ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Texto cambiado ' + item);
        }

        function buscar() {
            var start=uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('getView').start.format("YYYY-MM-DD");
            var end=uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('getView').end.subtract(1,'day').format("YYYY-MM-DD");
            Consultorio.getHorariosInterval(vm.consultorio,start,end).then(function (res) {
                vm.eventos=res;
                activate();
            });

        }
        function unidadSelect() {
            Consultorio.getByUnidadTipo(vm.tipo_servicio,vm.servicio).then(function (res) {
                vm.consultorios=res;
            });
        }
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (state.nombre.indexOf(lowercaseQuery) === 0);
            };

        }
        function querySearch(query) {
            return query ? lookup(query) :vm.pacientes;
        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.pacientes, function (item) {
                return item.nombre.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
        }


        function changeMonth(direction) {
             uiCalendarConfig.calendars['triangular-calendar'].fullCalendar(direction);
            buscar();
        }


        function init() {
            if(vm.isPacient){
                vm.selectedPacient=Persona.get();
            }else {
                vm.pacientes = Persona.list();
                vm.medico=Persona.get();
            }
            vm.unidad_servicio=UnidadServicio.list();
            vm.tipo_unidad_servicio=TipoServicio.list();

        }
        function activate() {

            vm.eventSources[0].events.splice(0, vm.eventSources[0].events.length);

            vm.eventos.forEach(function (consultorio) {
                var fecha=moment(consultorio.fecha);
                var color = getBrackground('Libre');
                consultorio.horarios_disponibles.forEach(function (value) {
                    var hora_inicio=moment(value.inicio,"HH:mm:ss");
                    var hora_termino=moment(value.termino,"HH:mm:ss");
                    var fecha_inicio=angular.copy(fecha);
                    fecha_inicio.set({ hour:hora_inicio.get('hour'), minute: hora_inicio.get('minute'), second: hora_inicio.get('second'), millisecond: hora_inicio.get('millisecond') });
                    var fecha_termino=angular.copy(fecha);
                    fecha_termino.set({ hour:hora_termino.get('hour'), minute: hora_termino.get('minute'), second: hora_termino.get('second'), millisecond: hora_termino.get('millisecond') });
                    var agenda={
                        "fecha": consultorio.fecha,
                        "hora_inicio": value.inicio,
                        "hora_termino": value.termino,
                        "consultorio_horario": value.id,
                        "paciente": vm.selectedPacient.id,
                        "medico": vm.isPacient?null:vm.medico.id
                    };
                    var mockup = {
                        title: 'Libre',
                        allDay: false,
                        start: fecha_inicio,
                        end:fecha_termino,
                        consultorio: agenda,
                        backgroundColor: triTheming.rgba(triTheming.palettes[color]['500'].value),
                        borderColor: triTheming.rgba(triTheming.palettes[color]['500'].value),
                        textColor: triTheming.rgba(triTheming.palettes[color]['500'].contrast),
                        palette: color
                    };
                    vm.eventSources[0].events.push(mockup);
                });

            });
            uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('refetchEvents');

        }


        function getBrackground(status) {
            if (status === 'Ocupado') {
                return 'red';
            } else if (status === 'Libre') {
                return 'green';
            }

        }
        function clear() {
            vm.consultorio=null;
            vm.servicio=null;
            vm.tipo_servicio=null;
            vm.selectedPacient=null;
            vm.searchText=null;
            init();
        }

    }

})();