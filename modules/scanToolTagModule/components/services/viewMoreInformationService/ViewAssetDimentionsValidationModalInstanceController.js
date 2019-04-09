'use strict';

angular.module('scanToolTagComponentsModule')
    .controller('ViewAssetDimentionsValidationModalInstanceController',['$scope', '$uibModalInstance','validationMessage', function ($scope, $uibModalInstance,validationMessage) {

        this.validationMessage = validationMessage;
        
        this.reject = function() {
            $uibModalInstance.dismiss();
        };

        this.resolve = function () {
            $uibModalInstance.close()
        };

    }]);