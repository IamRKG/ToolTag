angular.module('OrderToolTagComponentsModule')
.controller('ConfirmationModalInstanceController',['$uibModalInstance','resolvedToolTagShippingLocation',function ($uibModalInstance,resolvedToolTagShippingLocation) {

    this.fordToolingAssetNumber = resolvedToolTagShippingLocation.fordToolingAssetNumber;

    this.resolve = function () {
        $uibModalInstance.close();
    }

   this.reject = function () {
      $uibModalInstance.dismiss();
  };

}])