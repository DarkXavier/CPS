/**
 * Created by franciscojaviercerdamartinez on 24/09/16.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('Alergia',Alergia);

    function Alergia(Restangular)
    {
        var baseEnfermedad= Restangular.all('alergia');

        return {
            list:list,
            update:update,
            create:create,
            remove:remove
        };


        function list(){
            return baseEnfermedad.getList().$object;
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