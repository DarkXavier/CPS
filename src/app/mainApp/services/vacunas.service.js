/**
 * Created by Emmanuel on 25/09/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('Vacuna',Vacuna);

    function Vacuna(Restangular)
    {
        var baseVacuna = Restangular.all('vacuna');

        var service = {
            list:list,
            update:update,
            create:create,
            remove:remove
        };


        function list(){
            return baseVacuna.getList().$object;
        }

        function update(object)
        {
            return object.put();
        }

        function create(object){
            return baseVacuna.post(object);
        }

        function remove(object) {
            return baseVacuna.customDELETE(object.id,null,{'content-type':'application/json'});
        }

        return service;
    }

})();