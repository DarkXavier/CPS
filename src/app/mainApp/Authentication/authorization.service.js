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
                    if (isAuthenticated) {
                        // user is signed in but not
                        // authorized for desired state
                        var errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
                        var errorAuthorization = Translate.translate('MAIN.MSG.ERROR_ERROR_AUTHORIZATION');
                        toastr.error(errorAuthorization, errorTitle);
                        $state.go('login');
                    }
            });
        }
    }
})();
