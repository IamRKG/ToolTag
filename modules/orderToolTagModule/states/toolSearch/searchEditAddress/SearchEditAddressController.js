'use strict';

angular.module('OrderToolTagModule')
    .controller('SearchEditAddressController', ['$scope', '$state', 'ToolLocationModalServices', 'toolTrackingSheetsService', 'ViewComponentPartNumbersService', 'ViewMessageDescriptionModalServices', 'ViewComponentPartsModalServices', 'statesServices', 'WcAlertConsoleService', '$translate', 'countryFactory', 'toolTrackingSheetMobileListFactory', 'ViewHistoryModalServices', '$anchorScroll','$timeout','userProfileService', function ($scope, $state, ToolLocationModalServices, toolTrackingSheetsService, ViewComponentPartNumbersService, ViewMessageDescriptionModalServices, ViewComponentPartsModalServices, statesServices, WcAlertConsoleService, $translate, countryFactory, toolTrackingSheetMobileListFactory, ViewHistoryModalServices, $anchorScroll, $timeout, userProfileService) {
        this.EnumNulltoolTagShippingLocation = {
            name:null,
            street:null,
            city:null,
            country:null,
            state:null,
            postalCode:null
        }

        this.EnumEmptytoolTagShippingLocation = {
            name:"",
            street:"",
            city:"",
            country:"",
            state:"",
            postalCode:""
        }

        var toolTrackingSheetMobileList = new toolTrackingSheetMobileListFactory();
        toolTrackingSheetMobileList.toolTrackingSheetMobileList = $state.current.data.selectedFordToolingAssetNumber;
        toolTrackingSheetMobileList.countries(toolTrackingSheetMobileList.toolTrackingSheetMobileList);
        toolTrackingSheetMobileList.states(toolTrackingSheetMobileList.toolTrackingSheetMobileList)
        this.selectedFordToolingAssetNumber = toolTrackingSheetMobileList.toolTrackingSheetMobileList;
        
        var countryList = JSON.parse(sessionStorage.getItem('countries'));;
        var selectedListAssetNumber = this.selectedFordToolingAssetNumber;
    
        this.fordAssetNumber = [];
        this.editFordAssetNumber = [];
        this.selectedTagSize = "";
     
        this.selectAllTagSize = function(tagSize) {
        	angular.forEach(this.selectedFordToolingAssetNumber, function(result) {
        		result.toolTagSize = tagSize;
        	});
        	//console.log(this.selectedFordToolingAssetNumber);
        }
        
        this.toolDesc = function() {
        	angular.forEach(this.selectedFordToolingAssetNumber, function(result) {
        		result.shortDesc = result.toolingDesc.split("-")[0];
        	});
        	//console.log(this.selectedFordToolingAssetNumber);
        }
        
        this.toolDesc();
        
        this.viewTagSamples = function() {
     	   $state.get('select-tag-size').data.selectedFordToolingAssetNumber = toolTrackingSheetMobileList.toolTrackingSheetMobileList;
            $state.go('select-tag-size'); 
     }
        //View Component parts Modal
       /* this.viewComponentParts = function (result) {
            this.param = {
                toolOrderNumber: result.toolOrderNumber,
                fordAssetNumber: result.fordToolingAssetNumber,
                supplierSiteCode: result.supplierSiteCode,
                loginToken: userProfileService.getUserProfileFromSessionStorage().userAuthToken
            };
            ViewComponentPartNumbersService.getComponentPartNumbers(this.param).then(angular.bind(this, function (response) {
                this.viewComponentPartNumbers = response
                ViewComponentPartsModalServices.open(this.viewComponentPartNumbers)
            }));
        };*/
        
        this.viewMessage = function(toolTagOrderCount){
        	//ViewMessageDescriptionModalServices.open(toolTagOrderCount)
        	return messageDescription(toolTagOrderCount);
        	//console.log(this.message);
        };
        
        function messageDescription(toolTagOrderCount) {

    		if(toolTagOrderCount >= 0 && toolTagOrderCount < 4){
    			return "You have placed "+toolTagOrderCount+" tool tag orders for this asset"
    			
    		} else if (toolTagOrderCount >= 4 && toolTagOrderCount < 6){
    			return toolTagOrderCount+" tool tag orders have been placed for this asset.If you are experiencing issues with your tool tags, please submit a WebQuote ticket at the  <a href='http://www.request.ford.com'>Help Desk</a>";
    		} else {
    			return "Asset selection disabled for tool tag orders due to high volume of tag orders in the past. Please contact the Ford Buyer for further information."
    		}
             return "No Message";
         }
        
        this.selectAll = function () {
            for (var i = 0; i < selectedListAssetNumber.length; i++) {
            	if(!$('input[type=checkbox]')[i].disabled){               		
            		$('input[type=checkbox]')[i].checked = true;
            		var fordToolingAssetNumber = selectedListAssetNumber[i].fordToolingAssetNumber
            		this.selectedFordAssetNumber(fordToolingAssetNumber)
            	}
            }
        };

        this.selectNone = function () {
            this.editFordAssetNumber = [];
            for (var i = 0; i < selectedListAssetNumber.length; i++) {
                $('input[type=checkbox]')[i].checked = false;
            }
        };
        
        this.selectedFordAssetNumber = function (Number) {
            this.editFordAssetNumber = [];
            if (typeof Number === 'string') {
                this.fordAssetNumber.push(Number);
            } else {
                this.fordAssetNumber = Number
            }
            for (var i = 0; i < selectedListAssetNumber.length; i++) {
                var checkboxName = $('input[type=checkbox]')[i];
                if (checkboxName.checked == true) {
                    if (this.fordAssetNumber.indexOf(checkboxName.id) != -1) {
                        this.editFordAssetNumber.push(selectedListAssetNumber[i]);
                    }
                }
            }

        };

        this.editSelected = function () {
            if (this.editFordAssetNumber.length > 0) {
                this.isSelectOne = false;
                this.countryCode = this.editFordAssetNumber[0].toolTagShippingLocation.countryCode
                statesServices.getStates(this.countryCode).then(angular.bind(this, function (states) {
                    ToolLocationModalServices.open(this.editFordAssetNumber, countryList, states).then(angular.bind(this, function (updatedToLocation) {
                        for (var i = 0; i < this.selectedFordToolingAssetNumber.length; i++) {
                            if (updatedToLocation.fordToolingAssetNumber.indexOf(this.selectedFordToolingAssetNumber[i].fordToolingAssetNumber) != -1) {
                                this.selectedFordToolingAssetNumber[i].toolTagShippingLocation = updatedToLocation.toolTagShippingLocation;
                                toolTrackingSheetMobileList.toolTrackingSheetMobileList = this.selectedFordToolingAssetNumber;
                            }
                        }

                    }));
                }));
            } else {
                this.isSelectOne = true;
                $anchorScroll();

            }
        };



        this.confirmOrder = function () {
            if (this.editForm.$valid) {
                this.toolTrackingSheetMobileList = toolTrackingSheetMobileList.toolTrackingSheetMobileList;
                for (var i = 0; i < this.toolTrackingSheetMobileList.length; i++) {
                    var joinCountryWithCode = this.toolTrackingSheetMobileList[i].toolTagShippingLocation.country + '$@|' + this.toolTrackingSheetMobileList[i].toolTagShippingLocation.countryCode;
                    var joinStateWithCode = this.toolTrackingSheetMobileList[i].toolTagShippingLocation.state + '$@|' + this.toolTrackingSheetMobileList[i].toolTagShippingLocation.stateCode;
                    var country = this.toolTrackingSheetMobileList[i].toolTagShippingLocation.country;
                    var state = this.toolTrackingSheetMobileList[i].toolTagShippingLocation.state;
                    if (country.indexOf('$') == -1 && state.indexOf('$') == -1) {
                        this.getCountryWithCode = country.replace(country, joinCountryWithCode);
                        this.getStateWithCode = state.replace(state, joinStateWithCode);
                        this.toolTrackingSheetMobileList[i].toolTagShippingLocation.state = this.getStateWithCode;
                        this.toolTrackingSheetMobileList[i].toolTagShippingLocation.country = this.getCountryWithCode;
                    }
                }
                this.generateToolTagRequest = {
                		toolTrackingList: this.toolTrackingSheetMobileList,
                		loginToken: userProfileService.getUserProfileFromSessionStorage().userAuthToken
                };
                
                toolTrackingSheetsService.updateFordToolingAssetNumber(this.generateToolTagRequest).then(angular.bind(this, function (response) {
                    $state.get('confirm').data.confirm = $state.current.data.selectedFordToolingAssetNumber;
                    $state.go('confirm');
                    this.toolTrackingSheetMobileList = [];
                    toolTrackingSheetMobileList.toolTrackingSheetMobileList = [];
                    return response;
                }));
            } else {
                this.isSelectOne = false;
                this.isFormSubmitted = true;
                $anchorScroll();
            }
        };

        this.viewHistory = function (currentAddress) {
            ViewHistoryModalServices.open(currentAddress);
        };
        
    }]).directive('toolpopover', function () {
    	  
    	return {
    	    restrict: "A",
    	    link: function (scope, element, attrs) { 
    	        var options = {
    	            content: attrs.toolpopover,
    	            placement: "left",
    	            trigger: "outsideClick",
    	            html: true
    	        };
    	        $(element).popover(options);
    	    }
    	};
    	});