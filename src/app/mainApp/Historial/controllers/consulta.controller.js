/**
 * Created by franciscojaviercerdamartinez on 02/06/16.
 */
(function () {
    angular
        .module('app.mainApp.historial')
        .controller('consultaController',consultaController);

    function consultaController(UnidadServicio, TipoServicio, Consultorio){
        var vm = this;

        //Functions
        vm.getConsultorios=getConsultorios;
        //Variables
        vm.unidadMedica=null;
        vm.tipoServicio=null;
        vm.consultorio=null;

        activate();

        function activate(){
            vm.unidadesMedicas=UnidadServicio.list();
            vm.tiposServicio=TipoServicio.list();
        }

        function getConsultorios() {
            vm.consultorios=Consultorio.getByUnidadTipo(vm.tipoServicio.id,vm.unidadMedica.id);
            console.log(vm.consultorios);

        }           


    }

})();
