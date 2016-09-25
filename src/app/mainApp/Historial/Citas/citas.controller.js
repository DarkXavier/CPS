/**
 * Created by Christian on 24/09/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.historial')
        .controller('CitasController', CitasController);

    function CitasController($timeout, $q, $log, $rootScope,triTheming , $mdDialog, $mdToast, $filter, triLayout, uiCalendarConfig) {
        var vm = this;
        vm.pacientes = [
            {
                id: 0,
                nombre: "adan",
                apellido_paterno: "amezcua",
                apellido_materno: "aguilar",
                telefono: "2323232",
                foto: ""

            },
            {
                id: 1,
                nombre: "Emmanuel",
                apellido_paterno: "Plata",
                apellido_materno: "Negrete",
                telefono: "2323232",
                foto: ""

            }, {
                id: 2,
                nombre: "Jorge Erik",
                apellido_paterno: "Montiel",
                apellido_materno: "Arguijo",
                telefono: "2323232",
                foto: ""

            }];
        vm.fecha_inicio = null;
        vm.fecha_fin = null;
        vm.calendarOptions = {
            defaultView: 'agendaWeek',
            contentHeight: 'auto',
            selectable: true,
            editable: false,
            header: false,
            lang: 'es-mx',
            timeFormat: ' ',
            /*monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
             monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
             dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
             dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],*/
            viewRender: function (view) {
                // change day
                vm.currentDay = view.calendar.getDate();
                vm.currentView = view.name;
                activate();
                // update toolbar with new day for month name
                $rootScope.$broadcast('calendar-changeday', vm.currentDay);
                // update background image for month
                triLayout.layout.contentClass = 'calendar-background-image background-overlay-static overlay-gradient-10';

            },
            dayClick: function (date, jsEvent, view) { //eslint-disable-line
                vm.currentDay = date;
            },
            eventClick: function (calEvent, jsEvent, view) { //eslint-disable-line
                /*console.log(calEvent._id);
                console.log(calEvent);*/

                eliminar(calEvent._id);
            },
            events: function (start, end, callback) {
                vm.fecha_inicio = moment();
                vm.fecha_fin = end;

            },
            select:function(start, end, allDay) {
                vm.fecha_selection_start=start;
                vm.fecha_selection_end=end;
                var mockup = {
                    title: "Adan Amezcua",
                    allDay: false,
                    start: start,
                    end: end,
                    backgroundColor: triTheming.rgba(triTheming.palettes['red']['500'].value),
                    borderColor: triTheming.rgba(triTheming.palettes['red']['500'].value),
                    textColor: triTheming.rgba(triTheming.palettes['red']['500'].contrast),
                    palette: 'red'
                };
                vm.eventSources[0].events.push(mockup);
            }
        };
        vm.consultorios = [
            {
                id: 0,
                nombre: 'Consultorio 1'
            }, {
                id: 1,
                nombre: 'Consultorio 2'
            }, {
                id: 2,
                nombre: 'Consultorio 3'
            }];
        vm.unidad_servicio = [
            {
                id: 0,
                name: 'ESCOM'
            }
            , {
                id: 1,
                name: 'ESIME-Zacatenco'
            }, {
                id: 0,
                name: 'ESIA-Zacatenco'
            }];
        vm.tipo_unidad_servicio = [
            {
                id: 0,
                name: "Psicología"
            }
            , {
                id: 1,
                name: "Dentista"
            },
            {
                id: 2,
                name: "Médico"
            }];
        vm.eventos = [
            {
                pacient: 'Paciente 1',
                type: 'Ocupado',
                fecha: moment().add(1, 'h'),
                allDay: false
            },
            {
                pacient: 'Paciente 2',
                type: 'Libre',
                fecha: moment().add(3, 'h'),
                allDay: false
            },
            {
                pacient: 'Paciente 3',
                type: 'Ocupado',
                fecha: moment().add(5, 'h'),
                allDay: false
            },
            {
                pacient: 'Paciente 4',
                type: 'Libre',
                fecha: moment().add(7, 'h'),
                allDay: false
            },
            {
                pacient: 'Paciente 5',
                type: 'Ocupado',
                fecha: moment().add(9, 'h'),
                allDay: false
            },
            {
                pacient: 'Paciente 6',
                type: 'Libre',
                fecha: moment().add(11, 'h'),
                allDay: false

            }
        ];


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
        vm.querySearch = querySearch;
        vm.selectedItemChange = selectedItemChange;
        vm.searchTextChange = searchTextChange;
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

        function buscar() {
            //uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('changeView', 'agendaWeek');
            vm.showCalendar = true;
            $mdToast.show(
                $mdToast.simple()
                    .content($filter('triTranslate')("Se ha confirmado tu cita con éxito "))
                    .position('bottom right')
                    .hideDelay(2000)
            );
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


        function changeMonth(direction) {
            uiCalendarConfig.calendars['triangular-calendar'].fullCalendar(direction);
        }

        /*
         angular.element('.calendar').fullCalendar('changeView', 'agendaWeek');
         setTimeout(function () {
         //uiCalendarConfig.calendars.myCalendar.fullCalendar('changeView', 'agendaWeek' );
         uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('changeView', 'agendaWeek');
         }, 200);*/

        function activate() {
            vm.eventSources[0].events.splice(0, vm.eventSources[0].events.length);

            vm.eventos.forEach(function (value) {
                var color = getBrackground(value.type);
                var mockup = {
                    title: value.pacient,
                    allDay: false,
                    start: value.fecha,
                    end: value.fecha.add(1, 'h'),
                    backgroundColor: triTheming.rgba(triTheming.palettes[color]['500'].value),
                    borderColor: triTheming.rgba(triTheming.palettes[color]['500'].value),
                    textColor: triTheming.rgba(triTheming.palettes[color]['500'].contrast),
                    palette: color
                };
                vm.eventSources[0].events.push(mockup);
            });
            console.log(vm.eventos);

        }


        function getBrackground(status) {
            if (status === 'Ocupado') {
                return 'red';
            } else if (status === 'Libre') {
                return 'green';
            }

        }


    }
})();