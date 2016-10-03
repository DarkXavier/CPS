/**
 * Created by franciscojaviercerdamartinez on 24/09/16.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('Persona', Persona);

    function Persona(Restangular) {
        var baseEnfermedad = Restangular.all('persona');

        return {
            list: list,
            update: update,
            create: create,
            remove: remove,
            get: get,
            listEsp:listEsp
        };


        function list() {
            return baseEnfermedad.all('list').getList().$object;
        }
        function listEsp() {
            return baseEnfermedad.all('list').getList();
        }
        function get() {
            return baseEnfermedad.customGET().$object;

        }

        function update(object) {
            return baseEnfermedad.all(object.id).customPUT(object);
        }


        function create(object) {
            return baseEnfermedad.post(object);
        }

        function remove(object) {
            return baseEnfermedad.customDELETE(object.id, null, {'content-type': 'application/json'});
        }


        return service;
    }

})();