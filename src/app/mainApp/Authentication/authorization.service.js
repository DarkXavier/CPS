(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .factory('authorization', authorization);
    /* @ngInject */
    function authorization($rootScope, $state, AuthService, toastr, Translate) {

        return {
            authorize: authorize
        };
        function authorize() {
            AuthService.getUser().then(function (resp) {
                var isAuthenticated = AuthService.isAuthenticated();
                    if (!isAuthenticated) {
                        $state.go('login');
                    }
            });
        }
    }
})();
