/**
 * Created by Emmanuel on 25/09/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp')
        .factory('Profile',Profile);

    function Profile(Restangular)
    {
        var baseProfile = Restangular.one('persona');

        return {
            get:get,
            update:update,
            create:create,
            remove:remove
        };


        function get(){
            return baseProfile.customGET().$object;
        }

        function update(object)
        {
            return baseProfile.all(object.id).customPUT(object);
        }

        function create(object){
            return baseProfile.post(object);
        }

        function remove(object) {
            return baseProfile.customDELETE(object.id,null,{'content-type':'application/json'});
        }

    }

})();