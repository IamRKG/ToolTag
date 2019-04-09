'use strict';

angular.module('OrderToolTagComponentsModule')
    .controller('ToolLocationModalInstanceController', ['$scope', '$uibModalInstance', 'address', 'statesServices', 'resolvedCountryList', 'resolvedStatesList', 'toolTagShippingLocationFactory', 'ConfirmationModalServices', 'viewHistorySessionStorageServices', function ($scope, $uibModalInstance, address, statesServices, resolvedCountryList, resolvedStatesList, toolTagShippingLocationFactory, ConfirmationModalServices, viewHistorySessionStorageServices) {

        this.selectedAddress = address;
        this.countries = resolvedCountryList;
        this.states = resolvedStatesList;

        this.defaultSelecteCountry = function () {
            if (this.address.toolTagShippingLocation.country != null) {
                this.joinCountyWithCode = this.address.toolTagShippingLocation.country + '$@|' + this.address.toolTagShippingLocation.countryCode;
                return this.joinCountyWithCode;
            }
        };

        this.defaultSelecteState = function () {
            if (this.address.toolTagShippingLocation.state != null) {
                this.joinStateWithCode = this.address.toolTagShippingLocation.state + '$@|' + this.address.toolTagShippingLocation.stateCode;
                return this.joinStateWithCode
            }
        };

        if (this.selectedAddress.length > 1) {
            var toolTagShippingLocation = new toolTagShippingLocationFactory();
            this.address = toolTagShippingLocation.toolTagShippingLocation;
            this.address.country = this.countries[0].code;
            this.address.state = this.states[0].code;
            for (var i = 0; i < this.selectedAddress.length; i++) {
                toolTagShippingLocation.fordToolingAssetNumber.push(this.selectedAddress[i].fordToolingAssetNumber);
                this.selectedFordToolingAssetNumber = toolTagShippingLocation.fordToolingAssetNumber;
                this.address = toolTagShippingLocation;
            }
        } else {
            this.selectedOneAddress = angular.copy(this.selectedAddress[0]);
            var toolTagShippingLocation = new toolTagShippingLocationFactory();
            toolTagShippingLocation.toolTagShippingLocation = this.selectedOneAddress;
            this.address = toolTagShippingLocation.toolTagShippingLocation;
            this.address.toolTagShippingLocation.country = this.defaultSelecteCountry();
            this.address.toolTagShippingLocation.state = this.defaultSelecteState();
        }

        this.getCountryANDCode = function () {
            this.selectedCountry = this.address.toolTagShippingLocation.country;
            if (this.selectedCountry != undefined) {
                this.countryANDCode = this.selectedCountry.split('$@|');
            }
            return this.countryANDCode;
        };

        this.getStateANDCode = function () {
            this.selectedState = this.address.toolTagShippingLocation.state;
            if (this.selectedState != undefined) {
                this.stateANDCode = this.selectedState.split('$@|');
            }
            return this.stateANDCode;
        };

        this.retrieveStates = function () {
            var getCountryORCode = this.getCountryANDCode();
            if (getCountryORCode != undefined) {
                statesServices.getStates(getCountryORCode[1]).then(angular.bind(this, function (states) {
                    this.states = states;
                    this.address.toolTagShippingLocation.state = this.states[0].localDescription;
                    return this.states;
                }));
            }
        };


        this.reject = function () {
            $uibModalInstance.dismiss();
        };

        this.resolve = function () {
            if (this.toolLocationForm.$valid) {
                viewHistorySessionStorageServices.setPreviousAddressInfo(this.selectedAddress);

                var getCountryANDCode = this.getCountryANDCode();
                var getStateANDCode = this.getStateANDCode();
                this.address.toolTagShippingLocation.country = getCountryANDCode[0];
                this.address.toolTagShippingLocation.countryCode = getCountryANDCode[1];

                this.address.toolTagShippingLocation.state = getStateANDCode[0];
                this.address.toolTagShippingLocation.stateCode = getStateANDCode[1];
                $uibModalInstance.close(this.address)
            } else {
                this.isFormSubmitted = true;
            }
        };

    }])