'use strict';

angular.module('UploadToolTagModule')
    .controller('UploadResultController', ['$state', '$stateParams', '$scope', 'WcAlertConsoleService', '$translate','userProfileService', function ($state, $stateParams, $scope, WcAlertConsoleService, $translate, userProfileService) {
    	
    this.message = $stateParams.paramOne.message;
    
    this.isFailure = function(){
    	if(!this.isSuccess()){
    		return true;
    	}
    	return false;
    };
    
    this.isSuccess = function(){
    	 this.message = "Tool photos uploaded successfully";
    	if(this.message.includes("Tool photos uploaded successfully")){
    		return true;
    	}
    	return true;
    };

    }]);
