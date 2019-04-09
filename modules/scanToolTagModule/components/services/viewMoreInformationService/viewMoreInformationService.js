'use strict';

angular.module('ScanToolTagModule').
service('viewMoreInformationService',['WcHttpEndpointPrototype','$q','httpErrorStatusCodesService',function (WcHttpEndpointPrototype,$q,httpErrorStatusCodesService) {

    this.fetchDetailedAssetInformationForTheAssetEndPoint = new WcHttpEndpointPrototype('toolTrackingSheets/fetchDetailedAssetInformation');

    this.getDetailedAssetInformation = function (param) {
        return this.fetchDetailedAssetInformationForTheAssetEndPoint.post(param).then(function (response) {
            return response.data;
        },function (error) {
            httpErrorStatusCodesService.getHttpErrorStatusCodes(error)
            return $q.reject(error);
        })
    }

}]);