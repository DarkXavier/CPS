/**
 * Created by Emmanuel on 16/07/2016.
 */
(function(){
    'use strict';
    
    angular
        .module('app')
        .constant('SERVER',{
            //URL:'http://45.55.239.32/',
            URL:'http://104.236.203.150/',
            //clientId:'rBLSap7rJORjfTh80GI4vBgcxSefUHHrKtVXWEaD',
            clientId:'pRKj87ZJd9AIupNbEdk3ZoEhcALnnTUgUPqhHngu',
            //clientSecret:'CofY368VLw4iFkUtTuU5Rcle93NGCx93ec3FFajYdsb3dBPqZrGFsBqMaDqadD8f2oljocjP62LQaJkrZc8XKhcjuaxpUuMTGhJjKH6IfIATdkPBybsi1FxyKsBicYPX'
            clientSecret:'r32EIetZwrUFxyzR10MYPZRt9sipdSFCkPDIVCLhZTgx8BhSO48KNlogyTzlSF1hmGRyA9XMl30JZvWgA2l8QqCjO8D3w4XxhT76SoZrtIDsPaigJDFjN9KhybjVu1zP'
        }).constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized',
        sessionRestore: 'auth-session-restored'
    });
})();