'use strict';

angular.module('ScanToolTagModule')
    .controller('QRScanResultController', ['$state', '$stateParams', 'assetValidationService', '$scope', 'WcAlertConsoleService', '$translate', 'userProfileService', function ($state, $stateParams, assetValidationService, $scope, WcAlertConsoleService, $translate, userProfileService) {


        this.qrResult = $state.current.data;

        if(this.qrResult !== undefined && this.qrResult.qrResult !== null && this.qrResult.qrResult !== "") {
        this.fordAssetNumber = this.qrResult.slice(this.qrResult.indexOf('Ford'), this.qrResult.indexOf('End'));
        this.endItemPartNumber = this.qrResult.slice(this.qrResult.indexOf('End'));

        this.message = ''

        var scanLocation = angular.bind(this, function (formattedLocation, lattitude, longitude) {
            var address = {}
            formattedLocation.Location.Address.AdditionalData.map(function (result) {
                address[result.key] = result.value;
            });
            var fmtdLoc = {
                country: address.CountryName.toUpperCase(),
                state: address.StateName.toUpperCase(),
                city: formattedLocation.Location.Address.City.toUpperCase(),
                scannedLatitude: lattitude,
                scannedLongitude: longitude
            };

            this.param = {
                toolOrderNumber: '',
                fordAssetNumber: this.fordAssetNumber.slice(this.fordAssetNumber.indexOf(':') + 1).replace(/\s+/g, ''),
                supplierSiteCode: '',
                loginToken: userProfileService.getUserProfileFromSessionStorage().userAuthToken,
                scanLocation: fmtdLoc
            };
            if (this.param.fordAssetNumber != '' && this.param.fordAssetNumber != null) {
                 assetValidationService.validateAssetInformation(this.param).then(angular.bind(this, function (response) {
                    this.message = response.message;
                }));
            }
        });

        this.isFailure = function () {
            if ((!this.isTimeOut()) && this.fordAssetNumber.trim() == '') {
                this.message = 'Tool Tag is invalid.Please reorder the tool tag.'
                this.fordAssetNumber = ''
                this.endItemPartNumber = ''
            }

            if (this.message == 'Asset Number assigned to different supplier.' ||
                this.message == 'Tool Tag is invalid.Please reorder the tool tag.' ||
                this.message == 'Asset Number not found.Please reference the Tool Tagging application user guide.') {
                return true;
            }
            return false;
        };

        this.isAssetMoved = function () {
            if (this.message == 'Location for this asset does not match Ford records.Please notify the Ford Buyer.') {
                return true;
            }
            return false;
        };

        this.isCurrentToolLocationBlank = function () {
            if (this.message == 'Asset location not in WebQuote, please provide the address in WebQuote.') {
                return true;
            }
            return false;
        };

        this.isSuccess = function () {
            if (this.message == 'Tool Tag Validated Successfully.') {
                return true;
            }
            return false;
        };

        this.isDetailsAvailable = function () {
            if (this.isSuccess() || this.isAssetMoved() || this.isCurrentToolLocationBlank()) {
                return true;
            } else {
                return false;
            }
        };

        this.rescan = function () {
            $state.go('scan-tool-tag')
            $state.current.data = undefined;

        };

        this.moreInfo = function () {
            $state.go('more-info', {
                paramOne: {assetNumber: this.fordAssetNumber}
            });
        };

        this.isTimeOut = function () {
            const timeOutValue = 'Scan timed out! Please rescan to try again.'
            if (this.qrResult != undefined || this.qrResult != undefined) {
                if (timeOutValue === this.qrResult) {
                    this.fordAssetNumber = ''
                    this.endItemPartNumber = ''
                    return this.qrResult;
                }
            }
        }


        this.initHereMap = function () {

            function successCurrentPosition(position) {
                var pos = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
                return pos
            };

            var options = {
                enableHighAccuracy: true,
                timeout: 60000
            };
            var authentication = new H.service.Platform({
                'app_id': 'F2WdkN4wh6NA7USWEgJ2',
                'app_code': 'PVY6ud3vSITHso1CGp-o4w',
                useHTTPS: true
            });
            var authenticationSuccess = authentication.createDefaultLayers();
            var hereMapContainer =  document.getElementById('hereMapContainer')
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var getSuccessCurrentPosition = successCurrentPosition(position);
                    var map = new H.Map(
                        hereMapContainer,
                        authenticationSuccess.normal.map,
                        {
                            zoom: 10,
                            center: {lat: getSuccessCurrentPosition.latitude, lng: getSuccessCurrentPosition.longitude}
                        });

                    var latLong = getSuccessCurrentPosition.latitude + ',' + getSuccessCurrentPosition.longitude + '150';

                    var reverseGeocodingParameters = {
                        prox: latLong,
                        mode: 'retrieveAddresses'
                    };
                    maxresults: 1

                    function onSuccess(result) {
                        if (result.Response.View.length != 0) {
                            hereMapContainer.style.display = "none";
                            var location = result.Response.View[0].Result[0];
                            scanLocation(location,getSuccessCurrentPosition.latitude,getSuccessCurrentPosition.longitude);
                        } else {
                            WcAlertConsoleService.addMessage({
                                message:'No Result Found',
                                type:'warning'
                            })
                        }

                    };

                    function onError (e) {
                        var error = e+"Error"
                        WcAlertConsoleService.addMessage({
                            message:error,
                            type:'warning'
                        })
                    }

                    var geocoder = authentication.getGeocodingService();
                    geocoder.reverseGeocode(reverseGeocodingParameters, onSuccess,onError);
                }, handleError, options);
            } else {
                WcAlertConsoleService.addMessage({
                    message:'Your browser doesn\'t support geolocation.',
                    type:'warning'
                })
            }

            function handleError(error) {
                if (error.code == 1) {
                    var  errorMessage =  ErrorMessage(error.message);
                } else {
                    var  errorMessage = ErrorMessage(error.message);
                }

                function ErrorMessage(message) {
                    if(message === "User denied Geolocation"){
                        return "Device Camera and Location access mandatory for scanning Tool Tags";
                    }else{
                        return message;
                    }
                    
                }

                WcAlertConsoleService.addMessage({
                    message:errorMessage,
                    type:'warning'
                })
            };

        };

        if (this.qrResult != 'Scan timed out! Please rescan to try again.') {
            map.addEventListener('load', this.initHereMap());
        }
      }
    }]);