'use strict';
angular.module('ToolTagAppComponentsModule')
    .service('httpErrorStatusCodesService', ['$q','WcAlertConsoleService', '$translate','$state','userProfileService','httpStatusCodesConstant', '$timeout', '$window',function($q,WcAlertConsoleService, $translate, $state,userProfileService,httpStatusCodesConstant,$timeout, $window) {
        this.getHttpErrorStatusCodes = function(failure) {

            WcAlertConsoleService.removeErrorMessages();

            if (failure.status == httpStatusCodesConstant.unauthorized401) {
            	
                userProfileService.clearUserInformation();
                $window.location.href = 'https://us.sso.covisint.com/jsp/preLogin.jsp?host=https://fim.covisint.com&CT_ORIG_URL=%2Fap%2Fford%3FTARGET%3Dhttp%3A%2F%2Fwwwqa.webquote1.ford.com&ct_orig_uri=%2Fap%2Fford%3FTARGET%3Dhttp%3A%2F%2Fwwwqa.webquote1.ford.com';
                WcAlertConsoleService.addMessage({
                    message: 'Session Expired!. Please login again to continue',
                    type: 'warning',
                    multiple: false
                });

            } else if (failure.status == httpStatusCodesConstant.serviceunavilable || failure.status == httpStatusCodesConstant.internalServerError500) {
            	            	
            	 var currentPage = $state.current.name;    	             	 

     					 $state.reload();            		 
                		 $timeout(function () {
                			 $('#loading-indicator').hide().animate({opacity:0}, 10);
         					 $('#loading-cover').hide().animate({opacity:0}, 10);
                         },4000)  
                         
     					WcAlertConsoleService.addMessage({
                          message: 'Tool Tag Application is temporarily unavailable',
                          type: 'danger',
                          multiple: false
                      });
     					
            } else {
                WcAlertConsoleService.addMessage({
                	message: failure.message,
                    type: 'danger',
                    multiple: false
                });
            }
            return $q.reject(failure);
        }

     }]);
