/**
 * Created by franciscojaviercerdamartinez on 24/09/16.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('PersonaEnfermedad',PersonaEnfermedad);

    function PersonaEnfermedad(Restangular)
    {
        var baseEnfermedad= Restangular.all('persona_enfermedad_cronica');

        var service = {
            list:list,
            update:update,
            create:create,
            remove:remove,

        };


        function list(){
            return baseEnfermedad.all('list').getList().$object;
        }


        function update(object)
        {
            return baseEnfermedad.all(object.id).customPUT(object);
        }


        function create(object){
            return baseEnfermedad.post(object);
        }

        function remove(object) {
            return baseEnfermedad.customDELETE(object.id,null,{'content-type':'application/json'});
        }






        return service;
    }

})();