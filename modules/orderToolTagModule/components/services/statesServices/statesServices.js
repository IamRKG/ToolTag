'use strict';

angular.module('OrderToolTagComponentsModule').
service('statesServices',['WcHttpEndpointPrototype','$q',function (WcHttpEndpointPrototype,$q) {

    this.statesEndPoint = new WcHttpEndpointPrototype('toolTrackingSheets/fetchStates');

    this.getStates = function (param) {
        return this.statesEndPoint.post(param).then(function (response) {
            return response.data;
        },function (error) {
            return $q.reject(error);
        })
    }

}]);