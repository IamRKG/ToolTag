'use strict';

angular.module('ScanToolTagModule')
    .controller('ViewMoreInformationController', ['$state','$stateParams', 'viewMoreInformationService','$scope','WcAlertConsoleService','$translate','userProfileService','ViewAssetDimentionsValidationModalServices', function ($state, $stateParams, viewMoreInformationService, $scope, WcAlertConsoleService, $translate, userProfileService,ViewAssetDimentionsValidationModalServices) {

    	this.detailedAssetInformationArray = [];
    	var detailedAssetInformation = '';

    	this.param = {
                 toolOrderNumber: '',
                 //fordAssetNumber: 'TRL0001-00-005',
                 //fordAssetNumber: 'T001100-01-001',
                 fordAssetNumber: $stateParams.paramOne.assetNumber.slice($stateParams.paramOne.assetNumber.indexOf(':')+1).replace(/\s+/g, ''),
                 supplierSiteCode: '',
                 loginToken: userProfileService.getUserProfileFromSessionStorage().userAuthToken
             };

             viewMoreInformationService.getDetailedAssetInformation(this.param).then(angular.bind(this, function (response) {
                 this.extractDetailedAssetInformationFromResult(response)  
                 this.validateDimentions()
             }));
                 
         this.extractDetailedAssetInformationFromResult = function (result) {
        	 this.detailedAssetInformationArray = result
        	 
        	 if(this.detailedAssetInformationArray.length > 0){
        		 this.detailedAssetInformation = this.detailedAssetInformationArray[0]
        	 }
         }
         
         this.validateDimentions = function() {
        	 if(this.detailedAssetInformation.toolLength == 'Not Available' || this.detailedAssetInformation.toolWidth == 'Not Available' ||
        			 this.detailedAssetInformation.toolDepth == 'Not Available' || this.detailedAssetInformation.toolWeight == 'Not Available'){
        		 
        		 this.validationMessage = "Dimension or weight details not in <br>WebQuote, please provide the details in <br>WebQuote."
        			 ViewAssetDimentionsValidationModalServices.open(this.validationMessage)
        	 }
         };
         
         this.home = function () {
             $state.go('home')

         };
        	 
    
    }]);