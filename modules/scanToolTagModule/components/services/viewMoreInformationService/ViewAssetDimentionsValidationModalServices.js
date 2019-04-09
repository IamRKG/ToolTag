'use strict';

angular.module('scanToolTagComponentsModule')
    .service('ViewAssetDimentionsValidationModalServices',['$uibModal',function ($uibModal) {

        this.open = function(validationMessage) {

            var modalInstance = $uibModal.open({
                templateUrl: 'toolTagApp/modules/scanToolTagModule/components/services/viewMoreInformationService/viewAssetDimentionsValidationMessageTemplate.html',
                controller: 'ViewAssetDimentionsValidationModalInstanceController as viewAssetDimentionsValidationModalInstanceController',
                resolve:{
                	validationMessage: function () {
                         return validationMessage;
                     }
                }
            });

            return modalInstance.result;
        };

    }]);