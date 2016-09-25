/**
 * Created by Emmanuel on 15/07/2016.
 */
(function(){
    'use strict';

    angular
        .module('app')
        .run(Run);
    function Run($rootScope,  OAuth, AuthService,authorization, $window, OAuthToken,$http,$state){
        $rootScope.$on('$stateChangeStart',function(event, toState, toStateParams){

            if(AuthService.isAuthenticated()) {
                AuthService.getUser();

            }
            if(!OAuth.isAuthenticated()){
                OAuth.getRefreshToken().then(
                    function(){
                        $http.defaults.headers.common['Authorization'] = 'Bearer '+OAuthToken.getToken().access_token;
                    }
                ).catch(
                    function(){
                        //Uncomment for enable user validation
                        $state.go('login');
                    }
                );
            }
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            if (AuthService.isIdentityResolved()) {
                authorization.authorize();
            }
        });
        $rootScope.$on('oauth:error',function(event, rejection) {
            if ('invalid_grant' === rejection.data.error) {
                return;
            }

            // Refresh token when a `invalid_token` error occurs.
            if ('invalid_token' === rejection.data.error) {
                return OAuth.getRefreshToken();
            }
            return $window.location.href = '/login';
        });


    }
})();