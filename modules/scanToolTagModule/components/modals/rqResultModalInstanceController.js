'use strict';

angular.module('scanToolTagComponentsModule')
    .controller('QRResultModalInstanceController',['$uibModalInstance','qrResult', function ($uibModalInstance,qrResult) {
        this.qrResult = qrResult;

        this.fordAssetNumber = this.qrResult.slice(this.qrResult.indexOf('Ford'),this.qrResult.indexOf('End'));
        this.endItemPartNumber = this.qrResult.slice(this.qrResult.indexOf('End'));

        this.reject = function() {
            $uibModalInstance.dismiss();
        };

    }])
