'use strict';

angular.module('OrderToolTagComponentsModule')
    .controller('ViewComponentPartsModalInstanceController',['$scope', '$uibModalInstance','resolvedComponentPartNumbers', function ($scope, $uibModalInstance,resolvedComponentPartNumbers) {

        this.componentPartNumbers = resolvedComponentPartNumbers;
        
        this.reject = function() {
            $uibModalInstance.dismiss();
        };

        this.resolve = function () {
            $uibModalInstance.close()
        };

    }]);