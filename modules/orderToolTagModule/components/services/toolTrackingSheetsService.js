'use strict';

angular.module('OrderToolTagComponentsModule').
    service('toolTrackingSheetsService',['WcHttpEndpointPrototype','$q','viewHistorySessionStorageServices','httpErrorStatusCodesService','$http','userProfileService','$state',function (WcHttpEndpointPrototype,$q,viewHistorySessionStorageServices,httpErrorStatusCodesService,$http,userProfileService,$state) {

    this.toolTrackingSheetsEndPoint = new WcHttpEndpointPrototype('toolTrackingSheets');
    this.toolTrackingSheetsFileUploadEndPoint = new WcHttpEndpointPrototype('toolTrackingSheets/upload');
    
    this.searchTool = function (param) {
        return this.toolTrackingSheetsEndPoint.post(param).then(function (response) {
            viewHistorySessionStorageServices.setMobileToolSheet(response.data);
            return response.data;
        },function (error) {
        	httpErrorStatusCodesService.getHttpErrorStatusCodes(error)
            return $q.reject(error);
        })
    }
    
    this.uploadPhoto = function (files, fordAssetKey, fordAssetNumber) {
    	
    	var formData = new FormData();
    	// formData.append('files', files);
    	for (var i in files) {
    		formData.append("files", files[i]);
    	}
    	formData.append('fordAssetKey', fordAssetKey.toString());
    	formData.append('fordAssetNumber', fordAssetNumber.toString());
    	formData.append('userAuthToken', userProfileService.getUserProfileFromSessionStorage().userAuthToken);
    	
    	
    	this.toolTrackingSheetsFileUploadEndPoint.post(formData,{
   		 transformRequest : angular.identity,
		 headers : {
             'Content-Type' : undefined,
             'AuthorizationToken' : userProfileService.getUserProfileFromSessionStorage().userAuthToken
         }}).then(function (response) {
        	 $state.go('upload-result', {
	                paramOne: { message: response.data.message}
	            });
            return response.data;
        },function (error) {
        	$state.go('upload-result', {
	                paramOne: { message: "There was an issue uploading your photos \n\n Please try again."}
	            });
             return error.data;
        });
        
/*        return this.toolTrackingSheetsFileUploadEndPoint.post(param).then(function (response) {
            viewHistorySessionStorageServices.setMobileToolSheet(response.data);
            return response.data;
        },function (error) {
        	httpErrorStatusCodesService.getHttpErrorStatusCodes(error)
            return $q.reject(error);
        })*/
    	
    	/*var fileArray = param.uploadedPictures;
    	alert(fileArray[0].file);*/
    	
    	
    	/* $http.post("rest/toolTrackingSheets/upload", formData,{
    		 transformRequest : angular.identity,
    		 headers : {
                 'Content-Type' : undefined,
                 'AuthorizationToken' : userProfileService.getUserProfileFromSessionStorage().userAuthToken
             }})
             .then(
                     function (response) {
                         $state.go('upload-result', {
         	                paramOne: { message: response.data.message}
         	            });
                         return response.data.message;
                     },
                     function (errResponse) {
                    	 $state.go('upload-result', {
          	                paramOne: { message: "There was an issue uploading your photos \n\n Please try again."}
          	            });
                         return errResponse.data;
                     }
                 );*/
    	 }
    

    this.updateFordToolingAssetNumber = function (list) {
        return this.toolTrackingSheetsEndPoint.put('',list).then(function (response) {
            return response.data;
        },function (error) {
        	httpErrorStatusCodesService.getHttpErrorStatusCodes(error)
            return $q.reject(error);
        })
    }

}]);