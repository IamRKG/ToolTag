'use strict';

angular.module('OrderToolTagComponentsModule').factory('toolTrackingSheetMobileListFactory', function () {

    var toolTrackingSheetMobileList = function () {
        this.toolTrackingSheetMobileList = [],
        this.countries = function (country) {
            for (var i = 0; i < country.length; i++) {
                if(country[i].toolTagShippingLocation.country != null) {
                    this.getCountry = country[i].toolTagShippingLocation.country;
                    this.countryWithOutCode = this.getCountry.split('$@|')
                    country[i].toolTagShippingLocation.country = this.countryWithOutCode[0]
                }
            }
        },
        this.states = function (states) {
            for (var i = 0; i < states.length; i++) {
                if(states[i].toolTagShippingLocation.state != null) {
                    this.getStates = states[i].toolTagShippingLocation.state;
                    this.stateWithOutCode = this.getStates.split('$@|');
                    states[i].toolTagShippingLocation.state = this.stateWithOutCode[0];
                }
            }
        }
    }
    return toolTrackingSheetMobileList;

});