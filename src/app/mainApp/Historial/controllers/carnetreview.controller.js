/**
 * Created by franciscojaviercerdamartinez on 17/08/16.
 */

(function(){
    'use strict';

    angular
        .module('app.mainApp.historial')
        .controller('carnetreviewController', carnetreviewController);

    function carnetreviewController($timeout, $q, $log) {
        var vm = this;
        // list of `state` value/display objects
        vm.states             = loadAll();
        vm.selectedItem       = null;
        vm.searchText         = null;
        vm.querySearch        = querySearch;
        vm.simulateQuery      = true;
        vm.isDisabled         = false;
        vm.selectedItemChange = selectedItemChange;
        vm.searchTextChange   = searchTextChange;

        //////////////////
        function querySearch (query) {
            var results = query ? vm.states.filter( createFilterFor(query) ) : vm.states, deferred;
            if(self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function searchTextChange(text) {
            $log.info('Texto cambiado a ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Texto cambiado ' + item);
        }

        /**
         * Build `states` list of key/value pairs
         */
        function loadAll() {
            /* jshint multistr: true */
            var allStates = 'Francisco Javier Cerda Martínez, Edgar Larios Tapia, Chadwick Carreto Arellano, \
                 Daniel Zuriel Franco Rodríguez, Sandra Bautista, Luis Enrique Olvera, Fernando Cerda,\
                Daniel Pérez Pérez';

            return allStates.split(/, +/g).map(function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };

        }

        vm.selected = [];

        vm.query = {
            order: 'name',
            limit: 5,
            page: 1
        };
        vm.success=success;
        function success(vacunas) {
            vm.vacunas = vacunas;
        }

        vm.vacunas = [{
            name: 'BCG',
            dosis: 'Unica',
            fecha:'19-08-1993'
        }, {
            name: 'Hepatitis B',
            dosis: '3ª',
            fecha:'19-02-1994'
        },{
            name: 'Pentavalente Acelular (DPat+VPI+HIB)',
            dosis: '4º',
            fecha:'19-02-1995'
        },{
            name: 'DPT',
            dosis: 'Refuerzo',
            fecha:'19-08-2012'
        },{
            name: 'Influenza',
            dosis: 'Unica',
            fecha:'19-12-2015'
        }
        ];
        vm.alergias = [{
            id: '1',
            name: 'Penicilina'


        }, {
            id: '2',
            name: 'Sulfas'
        },{
            id: '3',
            name: 'Ambroxol'
        },{
            id: '4',
            name: 'Lorantadina'
        },{
            id: '123',
            name: 'Camarones'
        }
        ];
        vm.types = [{
            id: '1',
            value: 'General'

        }, {
            id: '2',
            value: 'Dentista'
        },{
            id: '3',
            value: 'Psicología'
        },{
            id: '4',
            value: 'Orientacion'
        }
        ];
        vm.enfermedades = [{
            id: '1',
            value: 'Asma'


        }
        ];

        // init


    }
})();