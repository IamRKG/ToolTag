'use strict';

angular.module('OrderToolTagModule')
    .controller('ToolSearchController', ['$state', 'toolTrackingSheetsService', '$scope', 'WcAlertConsoleService', '$translate', '$timeout','userProfileService', function ($state, toolTrackingSheetsService, $scope, WcAlertConsoleService, $translate, $timeout, userProfileService) {


        var countries = "";
    	if(JSON.parse(sessionStorage.getItem('toolSearchResult'))) {
        	this.toolSearchResult = JSON.parse(sessionStorage.getItem('toolSearchResult'));
        } else {
        this.toolSearchResult = [];
        }
        this.toolSearch = function () {
            if (this.searchToolOrderForm.$valid) {
                this.param = {
                    toolOrderNumber: this.toolOrderNumber,
                    fordAssetNumber: this.fordAssetNumber,
                    loginToken: userProfileService.getUserProfileFromSessionStorage().userAuthToken
                };

                toolTrackingSheetsService.searchTool(this.param).then(angular.bind(this, function (response) {
                    this.toolSearchResultProcess(response);
                    sessionStorage.setItem("countries",JSON.stringify(response.countryList));
                    sessionStorage.setItem('toolSearchResult', JSON.stringify(this.toolSearchResult));
                    return this.toolSearchResult;
                }));
            } else {
                this.isFormSubmitted = true;
            }
        };

        this.toolSearchEnter = function (e) {
            if (e.charCode === 13) {
                this.toolSearch();
            }

        }

        this.toolSearchResultProcess = function (result) {
            this.updateToolTagShippingLocation = result.toolTrackingSheetMobileList;
            this.toolSearchResult = this.updateToolTagShippingLocation;
        }


        this.searchOrderNumber = {
            orderListSearch: [{"id": "0", "name": "Tool Order Number"}, {"id": "1", "name": "Ford Asset Number"}]
        };

        this.selectedSearch = this.searchOrderNumber.orderListSearch[0].id;

        this.toggleNumber = function () {
            this.toolOrderNumber = undefined;
            this.fordAssetNumber = undefined;
            this.isFormSubmitted = false;
        }
    }]);