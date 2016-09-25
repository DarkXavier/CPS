/**
 * Created by Christian on 24/09/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.historial')
        .controller('CitasController', CitasController);

    function CitasController($timeout, $q, $log, $rootScope, $mdDialog, $mdToast, $filter, triLayout, uiCalendarConfig) {
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
        vm.calendarOptions = {
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

                $mdDialog.show({
                    controller: 'EditarSolicitudDialogController',
                    controllerAs: 'vm',
                    templateUrl: 'app/mainApp/solicitudes/calendario/modal/editarSolicitud.dialog.tmpl.html',
                    targetEvent: jsEvent,
                    focusOnOpen: false,
                    locals: {
                        dialogData: {
                            title: 'Editar Solicitud',
                            confirmButtonText: 'Save'
                        },
                        event: calEvent,
                        edit: true
                    }
                }).then(function (event) {
                    var toastMessage = 'Se actualizo correctamente la solicitud';
                    //uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('updateEvent', event);
                    uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('refetchEvents');
                    activate();
                    // pop a toast
                    $mdToast.show(
                        $mdToast.simple()
                            .content($filter('triTranslate')(toastMessage))
                            .position('bottom right')
                            .hideDelay(2000)
                    );
                });
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


        //uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('changeView', 'agendaWeek');
        vm.selectedItem = null;
        vm.searchText = null;
        vm.showCalendar=false;
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
        vm.buscar=buscar;

        //////////////////
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
            uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('changeView', 'agendaWeek');
            vm.showCalendar=true;
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
            /*Solicitudes_Admin.consultaEspUnconfirmed().then(function (res) {
             res.forEach(function (value) {
             var color = getBrackground(value.tipo_solicitud);
             var mockup = {
             title: value.descripcion,
             allDay: false,
             start: moment(value.fecha_inicio,"YYYY-MM-DD"),
             end: moment(value.fecha_termino,"YYYY-MM-DD").add(1, 'days'),
             solicitud: value,
             backgroundColor: triTheming.rgba(triTheming.palettes[color]['500'].value),
             borderColor: triTheming.rgba(triTheming.palettes[color]['500'].value),
             textColor: triTheming.rgba(triTheming.palettes[color]['500'].contrast),
             palette: color
             };
             vm.eventSources[0].events.push(mockup);
             });
             });*/
        }


        function getBrackground(status) {
            if (status === 'Envio') {
                return 'teal';
            } else if (status === 'Recoleccion') {
                return 'blue-grey';
            } else {
                return 'indigo';
            }

        }


    }
})();