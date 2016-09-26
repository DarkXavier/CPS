/**
 * Created by Emmanuel on 25/09/2016.
 */
(function(){
    angular
        .module('app.mainApp.profile')
        .config(moduleconfig);
    
    function moduleConfig($stateProvider){
        $stateProvider
            .state('profile',{      
                    url:'/profile',
                    templateUrl:'app/mainApp/Profile/profile.tmpl.html',
                    controller:'profileController',
                    controllerAs:'vm'
        
                })
    }
    
})();