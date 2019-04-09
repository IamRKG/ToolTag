'use strict';

angular.module('scanToolTagComponentsModule')
    .service('QRScanResultModalServices',['$uibModal',function ($uibModal) {

        this.open = function(qrResult) {

            var modalInstance = $uibModal.open({
                templateUrl: 'toolTagApp/modules/scanToolTagModule/components/modals/rqResultModalTemplate.html',
                controller: 'QRResultModalInstanceController as rqResultModalInstanceController',
                resolve: {
                    qrResult: function () {
                        return qrResult;
                    }
                }
            });

            return modalInstance.result;
        };

    }]);