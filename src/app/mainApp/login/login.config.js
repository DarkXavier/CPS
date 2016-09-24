/**
 * Created by franciscojaviercerdamartinez on 22/09/16.
 */
(function () {
    angular
        .module('app.mainApp.login')
        .config(moduleConfig);

    function moduleConfig($stateProvider, triMenuProvider){
        $stateProvider
            .state('login',{
                url:'/login',
                templateUrl:'app/mainApp/login/login.tmpl.html',
                controller:'loginController',
                controllerAs:'vm'

            })

    }

})();
