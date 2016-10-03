/**
 * Created by Emmanuel on 16/07/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized',
            sessionRestore: 'auth-session-restored'
        })
        .constant('UTILS', {
            week: [
                {
                    id: 1,
                    value: "Lunes"
                },
                {
                    id: 2,
                    value: "Martes"
                },
                {
                    id: 3,
                    value: "Miércoles"
                }, {
                    id: 4,
                    value: "Jueves"
                }, {
                    id: 5,
                    value: "Viernes"
                }, {
                    id: 6,
                    value: "Sábado"
                }, {
                    id: 7,
                    value: "Domingo"
                }
            ]
        });
})();