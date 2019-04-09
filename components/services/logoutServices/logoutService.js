'use strict';

angular.module('ToolTagAppComponentsModule')
.service('logoutService', ['$q', 'WcHttpEndpointPrototype', 'httpErrorStatusCodesService', 
    function ($q, WcHttpEndpointPrototype, httpErrorStatusCodesService ) {

        this.logoutEndpoint = new WcHttpEndpointPrototype('userInformation/logout');
        
        this.clearUserInformation = function (authToken) {
            return this.logoutEndpoint.post(authToken).then(function (response) {
            //	$cookies.remove("UserInformation");
            	document.cookie = "UserInformation=; Max-Age=0";
            	//document.cookie = "UserToken"  '=; Max-Age=0';	
                return $q.when(response.data);
                
            }, function (failure) {
                httpErrorStatusCodesService.getHttpErrorStatusCodes(failure)
                return $q.reject(failure);
            });
        }
        

    }]);