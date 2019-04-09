'use strict';

angular.module('OrderToolTagComponentsModule')
    .service('ViewComponentPartsModalServices',['$uibModal',function ($uibModal) {

        this.open = function(componentPartNumbers) {

            var modalInstance = $uibModal.open({
                templateUrl: 'toolTagApp/modules/orderToolTagModule/components/modals/ComponentPartsModalServices/viewComponentPartsModalServicesTemplate.html',
                controller: 'ViewComponentPartsModalInstanceController as viewComponentPartsModalInstanceController',
                resolve:{
                    resolvedComponentPartNumbers: function () {
                         return componentPartNumbers;
                     }
                }
            });

            return modalInstance.result;
        };

    }]);