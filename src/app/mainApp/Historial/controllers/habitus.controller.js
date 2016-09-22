/**
 * Created by franciscojaviercerdamartinez on 13/08/16.
 */
(function(){
    'use strict';

    angular
        .module('app.mainApp.historial')
        .controller('habitusController', habitusController);

    function habitusController($timeout, $q, $log) {
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
        vm.labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
        vm.series = ['Talla', 'Peso'];
        vm.options = {
            datasetFill: false,

        };
        vm.data = [[150,151,152,152,152,152],[44,48,47,46,48,49]];



        // init


    }
})();