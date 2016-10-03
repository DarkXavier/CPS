/**
 * Created by franciscojaviercerdamartinez on 03/10/16.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('PersonaMedicos',PersonaMedicos);

    function PersonaMedicos(Restangular)
    {
        var baseDatosMedicos= Restangular.all('datos_medicos');

        var service = {
            list:list,
            update:update,
            create:create,
            remove:remove,
            getMedicosByPerson:getMedicosByPerson
        };


        function list(){
            return baseDatosMedicos.all('list').getList().$object;
        }


        function update(object)
        {
            return baseDatosMedicos.all(object.id).customPUT(object);
        }


        function create(object){
            return baseDatosMedicos.post(object);
        }

        function remove(object) {
            return baseDatosMedicos.customDELETE(object.id,null,{'content-type':'application/json'});
        }
        function getMedicosByPerson(person) {
            return baseDatosMedicos.one('person',person.id).getList();
        }






        return service;
    }

})();