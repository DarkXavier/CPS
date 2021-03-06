/**
 * Created by franciscojaviercerdamartinez on 24/09/16.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('Enfermedad',Enfermedad);

    function Enfermedad(Restangular)
    {
        var baseEnfermedad= Restangular.all('enfermedad_cronica');

        return {
            list:list,
            update:update,
            create:create,
            remove:remove,
            getEnfermedadesByPerson:getEnfermedadesByPerson
        };

        function getEnfermedadesByPerson(person) {
            return baseEnfermedad.one('person',person.id).getList();
        }
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