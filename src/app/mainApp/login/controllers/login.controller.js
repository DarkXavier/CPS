(function() {
    'use strict';

    angular
        .module('app.mainApp.login')
        .controller('loginController', loginController);

    /* @ngInject */
    function loginController($state, triSettings,AuthService,toastr) {
        var vm = this;
        
        vm.loginClick = loginClick;
        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            username: '',
            password: ''
        };

        function loginClick() {
            AuthService.login(vm.user).then(function(res){
                $state.go('triangular.admin-default.bienvenida');
            }).catch(function(err){
                toastr.error('Usuario o Contraseña incorrectos','Error',err.error);
            });
            
        }


    }
})();
