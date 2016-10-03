/**
 * Created by franciscojaviercerdamartinez on 24/09/16.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('Agenda', Agenda);

    function Agenda(Restangular) {
        var baseUrl = Restangular.all('agenda');

        return {
            list: list,
            update: update,
            create: create,
            remove: remove,
            get: get
        };


        function list() {
            return baseUrl.getList().$object;
        }

        function get() {
            return baseUrl.customGET().$object;

        }

        function update(object) {
            return baseUrl.all(object.id).customPUT(object);
        }


        function create(object) {
            return baseUrl.post(object);
        }

        function remove(object) {
            return baseUrl.customDELETE(object.id, null, {'content-type': 'application/json'});
        }
    }

})();