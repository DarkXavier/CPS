/**
 * Created by Emmanuel on 25/09/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('Vacunas',Vacunas);

    function Vacunas(Restangular)
    {
        var baseVacuna = Restangular.all('vacuna');

        return {
            list:list,
            update:update,
            create:create,
            remove:remove,
            getVacunasByPerson:getVacunasByPerson
        };


        function list(){
            return baseVacuna.getList().$object;
        }

        function update(object)
        {
            return baseVacuna.all(object.id).customPUT(object);
        }

        function create(object){
            return baseVacuna.post(object);
        }

        function remove(object) {
            return baseVacuna.customDELETE(object.id,null,{'content-type':'application/json'});
        }
        function getVacunasByPerson(person) {
            return baseVacuna.one('person',person.id).getList();
        }

    }

})();