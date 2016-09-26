/**
 * Created by Emmanuel on 25/09/2016.
 */
(function(){
    angular
        .module('app.mainApp.profile')
        .config(moduleConfig);
    
    function moduleConfig($stateProvider){
        $stateProvider
            .state('triangular.admin-default.profile',{
                    url:'/profile',
                    templateUrl:'app/mainApp/Profile/profile.tmpl.html',
                    controller:'profileController',
                    controllerAs:'vm'
        
                })
    }
    
})();