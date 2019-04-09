'use strict';

angular.module('OrderToolTagComponentsModule').
service('ViewComponentPartNumbersService',['WcHttpEndpointPrototype','$q', 'httpErrorStatusCodesService',function (WcHttpEndpointPrototype,$q,httpErrorStatusCodesService) {

    this.fetchComponentPartNumbersEndPoint = new WcHttpEndpointPrototype('toolTrackingSheets/fetchComponentPartNumbers');

    this.getComponentPartNumbers = function (param) {
        return this.fetchComponentPartNumbersEndPoint.post(param).then(function (response) {
            return response.data;
        },function (error) {
            httpErrorStatusCodesService.getHttpErrorStatusCodes(error)
            return $q.reject(error);
        })
    }

}]);