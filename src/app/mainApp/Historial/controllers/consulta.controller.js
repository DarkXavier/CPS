/**
 * Created by franciscojaviercerdamartinez on 02/06/16.
 */
(function () {
    angular
        .module('app.mainApp.historial')
        .controller('consultaController',consultaController);

    function consultaController($timeout, UnidadServicio, TipoServicio, Consultorio){
        var vm = this;

        //Functions
        vm.getConsultorios=getConsultorios;
        //Variables
        vm.unidadMedica=null;
        vm.tipoServicio=null;
        vm.consultorio=null;
        vm.persona=null;

        activate();

        function activate(){
            vm.unidadesMedicas=UnidadServicio.list();
            vm.tiposServicio=TipoServicio.list();
        }

        function getConsultorios() {
            return $timeout(function(){
                console.log(vm.tipoServicio);
                console.log(vm.unidadMedica);
                Consultorio.getByUnidadTipo(vm.tipoServicio.id,vm.unidadMedica.id).then(function (res) {
                    vm.consultorios= res;
                }).catch(function (err) {
                    console.log(err);

                });
                console.log(vm.consultorios);
            },500);
        }           


    }

})();
