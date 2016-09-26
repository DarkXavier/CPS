/**
 * Created by Emmanuel on 25/09/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp.profile')
        .controller('profileController', profileController);

    function profileController(Profile, toastr, $scope) {
        var vm = this;
        
        vm.editing=false;
        vm.generos=[
            "Hombre",
            "Mujer"
        ];
        
        activate();
        
        function activate(){
            vm.persona=Profile.get();
        }

    }

})();