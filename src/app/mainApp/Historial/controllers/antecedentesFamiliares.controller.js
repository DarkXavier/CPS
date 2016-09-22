/**
 * Created by franciscojaviercerdamartinez on 13/08/16.
 */
(function(){
    'use strict';

    angular
        .module('app.mainApp.historial')
        .controller('antecedentesFamiliaresController', antecedentesFamiliaresController);

    function antecedentesFamiliaresController($timeout, $q, $log) {
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
        vm.antecedentesFamiliares=[];
           vm.antecedentesFam ={
            id:'',
            enfermedad:'',
            parentesco:'',
            ladoparentesco:"",
            notas:''
        }
        vm.id=0;

        vm.enfermedades = [{
            id: '1',
            nombre: 'Cancer',
        }, {
            id: '2',
            nombre: 'Diabetes',
        }, {
            id: '3',
            nombre: 'Hipertensión',
        }, {
            id: '4',
            nombre: 'Hepatitis',
        },
            {
                id: '5',
                nombre: 'VIH',
            }
        ];
        vm.crearAntecedenteFamiliar = crearAntecedenteFamiliar;
        vm.eliminarAntecedenteFamiliar = eliminarAntecedenteFamiliar;
        // Crear insumo

        function crearAntecedenteFamiliar() {

            console.log("antecedente a agregar");
            console.log(vm.antecedentesFam)
            if (vm.antecedentesFam != null) {
                vm.id=vm.id+1;
                vm.antecedentesFam.id=vm.id;
                //console.log("antecedente a agregar con id");
               // console.log(vm.antecedentesFam)
               // console.log("Conjunto de antecedentes ");
               // console.log(vm.antecedentesFamiliares);
                vm.antecedentesFamiliares.push(vm.antecedentesFam);

                //console.log("Conjunto de antecedentes ahora");
               // console.log(vm.antecedentesFamiliares);

                vm.antecedentesFam ={
                    id:'',
                    enfermedad:'',
                    parentesco:'',
                    ladoparentesco:"",
                    notas:''
                }

               // console.log(vm.antecedentesFamiliares);

            }
        }

        // Eliminar Insumo


        function eliminarAntecedenteFamiliar(antecedente) {

            vm.antecedentecpy = antecedente;
            console.log(vm.antecedente.id);
            var index;

            for (index = 0; index < vm.antecedentesFamiliares.length; ++index) {

                if (vm.etapa.antecedentesFamiliares[index].id == vm.antecedentecpy.id) {

                    console.log("voy a borrar");
                    console.log(vm.antecedentesFamiliares[index]);
                    vm.antecedentesFamiliares.splice(index, 1);

                }
                else {
                    console.log("Aun no lo encuentro")
                }

            }

        }

        // init


    }
})();