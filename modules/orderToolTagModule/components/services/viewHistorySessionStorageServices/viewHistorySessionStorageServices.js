angular.module('OrderToolTagComponentsModule')
    .service('viewHistorySessionStorageServices', function () {

        this.selectedCurrentAddress = [];

        this.setMobileToolSheet = function (data) {
            sessionStorage.setItem('appData', JSON.stringify(data));
        };

        this.getMobileToolSheet = function () {
            var mobileToolSheet = JSON.parse(sessionStorage.getItem('appData'));
            return mobileToolSheet;
        };

        this.setPreviousAddressInfo = function (currentAddress) {
            this.selectedCurrentAddress = currentAddress;
            this.updateSelectedCurrentAddress = this.getPreviousAddressInfo();
            if (this.updateSelectedCurrentAddress == null || this.selectedCurrentAddress.length == this.getMobileToolSheet().toolTrackingSheetMobileList.length) {
                sessionStorage.setItem('previousAddress', JSON.stringify(this.selectedCurrentAddress));
            }
            else {
                for (var i = 0; i < this.selectedCurrentAddress.length; i++) {
                    for (var j = 0; j < this.updateSelectedCurrentAddress.length; j++) {
                        if (this.updateSelectedCurrentAddress[j].fordToolingAssetNumber == this.selectedCurrentAddress[i].fordToolingAssetNumber) {
                            this.updateSelectedCurrentAddress[j] = this.selectedCurrentAddress[i];
                            sessionStorage.setItem('previousAddress', JSON.stringify(this.updateSelectedCurrentAddress));
                        }else if(this.updateSelectedCurrentAddress[j].fordToolingAssetNumber != this.selectedCurrentAddress[i].fordToolingAssetNumber){
                            this.updateSelectedCurrentAddress.push(this.selectedCurrentAddress[i]);
                            sessionStorage.setItem('previousAddress', JSON.stringify(this.updateSelectedCurrentAddress));
                        }
                    }
                }
            }
        };

        this.getPreviousAddressInfo = function () {
            var previousAddress = JSON.parse(sessionStorage.getItem('previousAddress'));
            return previousAddress;
        }

    });