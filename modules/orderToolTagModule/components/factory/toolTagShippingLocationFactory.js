'use strict';

angular.module('OrderToolTagComponentsModule').
factory('toolTagShippingLocationFactory',function () {

    var toolTagShippingLocation = function () {

        this.fordToolingAssetNumber = [];

        this.toolTagShippingLocation = {
            "name":"",
            "addressGSDBCode":"",
            "city":"",
            "country":"",
            "countryCode":"",
            "postalCode":"",
            "state":"",
            "stateCode":"",
            "street":"",
            "town":"",
            "county":"",
            "previousCountry":"",
            "previousState":""
        };
    };

    return toolTagShippingLocation;

});