/**
 * Created by franciscojaviercerdamartinez on 24/09/16.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('Consultorio', Consultorio);

    function Consultorio(Restangular) {
        var baseEnfermedad = Restangular.all('consultorio');

        return {
            list: list,
            update: update,
            create: create,
            remove: remove,
            get: get,
            getByUnidadTipo: getByUnidadTipo,
            getHorariosInterval:getHorariosInterval
        };
        function getHorariosInterval(idConsultorio,fecha_inicio,fecha_termino) {
            return baseEnfermedad.all(idConsultorio).one('calendario',fecha_inicio).customGET(fecha_termino);
        }
        function getByUnidadTipo(tipo,unidad) {
            return baseEnfermedad.one('tipo',tipo).one('unidad',unidad).customGET();
        }

        function list() {
            return baseEnfermedad.all('list').getList().$object;
        }

        function get(id) {
            return baseEnfermedad.get(id).$object;

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

    }

})();