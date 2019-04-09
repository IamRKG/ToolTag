'use strict';
angular.module('OrderToolTagComponentsModule')
    .controller('ViewHistoryModalInstanceController', ['$uibModalInstance', 'resolvedCurrentAddress','viewHistorySessionStorageServices', function ($uibModalInstance, resolvedCurrentAddress, viewHistorySessionStorageServices) {

        this.currentAddress = angular.copy(resolvedCurrentAddress);
        this.getPreviousAddressInfo = viewHistorySessionStorageServices.getPreviousAddressInfo();

    if(this.getPreviousAddressInfo != null) {
        for (var i = 0; i < this.getPreviousAddressInfo.length; i++) {
            if (this.getPreviousAddressInfo[i].fordToolingAssetNumber == this.currentAddress.fordToolingAssetNumber) {
                if (JSON.stringify(this.getPreviousAddressInfo[i].toolTagShippingLocation) == JSON.stringify(this.currentAddress.toolTagShippingLocation)) {
                    this.previousAddress = [];
                } else {
                    this.previousAddress = this.getPreviousAddressInfo[i];
                }

            }
        }
        }


        this.reslove = function () {
            $uibModalInstance.close()
        }

        this.reject = function () {
            $uibModalInstance.dismiss()
        }



    }]);