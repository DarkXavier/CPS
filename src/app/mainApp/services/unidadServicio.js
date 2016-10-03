/**
 * Created by franciscojaviercerdamartinez on 24/09/16.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('UnidadServicio', UnidadServicio);

    function UnidadServicio(Restangular) {
        var baseEnfermedad = Restangular.all('unidad_servicio');

        return {
            list: list,
            update: update,
            create: create,
            remove: remove,
            get: get
        };

        function get(id) {
            return baseEnfermedad.customGET(id);
        }

        function list() {
            return baseEnfermedad.getList().$object;
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