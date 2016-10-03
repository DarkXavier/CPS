/**
 * Created by franciscojaviercerdamartinez on 24/09/16.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('Persona', Persona);

    function Persona($q, Restangular) {
        var baseEnfermedad = Restangular.all('persona');

        return {
            list: list,
            update: update,
            create: create,
            remove: remove,
            get: get,
            listEsp:listEsp,
            carnet:carnet
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
        function carnet(object){
            var deferred = $q.defer();
            Restangular.all('datos_persona').customPOST(object).then(function(res){
                deferred.resolve(res);
               // console.log(res);
            }).catch(function(err){
                deferred.reject(err);
                //console.log(err);
            })
            return deferred.promise;
        }



    }

})();