angular.module('OrderToolTagComponentsModule')
    .service('ConfirmationModalServices',['$uibModal',function ($uibModal) {

        this.open = function (getToolTagShippingLocation) {
            var modalInstance = $uibModal.open({
                templateUrl:'toolTagApp/modules/orderToolTagModule/components/modals/ConfirmationModal/ConfirmationModalTemplate.html',
                controller:'ConfirmationModalInstanceController as confirmationModalInstanceController',
                resolve:{
                    resolvedToolTagShippingLocation:function () {
                        return getToolTagShippingLocation;
                    }
                }
            });
            return modalInstance.result
        }

    }])