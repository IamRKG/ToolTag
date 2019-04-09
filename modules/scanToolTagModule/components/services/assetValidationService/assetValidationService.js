'use strict';

angular.module('ScanToolTagModule').
service('assetValidationService',['WcHttpEndpointPrototype','$q','httpErrorStatusCodesService',function (WcHttpEndpointPrototype,$q,httpErrorStatusCodesService) {

    this.validationForTheAssetEndPoint = new WcHttpEndpointPrototype('toolTrackingSheets/validateFordAssetNumber');

    this.validateAssetInformation = function (param) {
        return this.validationForTheAssetEndPoint.post(param).then(function (response) {
            return response.data;
        },function (error) {
            httpErrorStatusCodesService.getHttpErrorStatusCodes(error)
            return $q.reject(error);
        })
    }

}]);