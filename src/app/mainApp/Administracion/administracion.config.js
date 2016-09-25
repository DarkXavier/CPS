/**
 * Created by franciscojaviercerdamartinez on 24/09/16.
 */
(function () {
    angular
        .module('app.mainApp.administracion')
        .config(moduleConfig);

    function moduleConfig($stateProvider, triMenuProvider) {
        triMenuProvider.addMenu({
            name: 'Administración',
            icon: 'fa fa-cog',
            type: 'dropdown',
            children: [{
                name: 'Gestión Usuarios',
                state: 'triangular.admin-default.carnetreview',
                type: 'link'
            }, {
                name: 'Gestión Unidad de Atencion',
                state: 'triangular.admin-default.unidades',
                type: 'link'
            }, {
                name: 'Gestíon de Consultorios',
                state: 'triangular.admin-default.carnetreview',
                type: 'link'
            },
            ]
        });


    }

})();