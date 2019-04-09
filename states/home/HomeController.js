'use strict';

/**
 * @ngdoc controller
 * @module ToolTagAppModule
 * @name HomeController
 * @description
 * The HomeController is the starting point of the application, when the application starts this controller will be called first.
 */
angular.module('ToolTagAppModule')
	.controller('HomeController',['$state','userProfileService','logoutService','$window', function ($state,userProfileService, logoutService, $window) {
		
		this.supplierName = userProfileService.getUserProfileFromSessionStorage().userName;
		
		this.logout = function() {
			this.param = userProfileService.getUserProfileFromSessionStorage().userAuthToken;
			logoutService.clearUserInformation(this.param).then(function(response){
				if(response.message = "Successful"){
					userProfileService.clearUserInformation();
					//$cookies.remove('UserInformation');
					$window.location.href = 'https://us.sso.covisint.com/jsp/preLogin.jsp?host=https://fim.covisint.com&CT_ORIG_URL=%2Fap%2Fford%3FTARGET%3Dhttp%3A%2F%2Fwwwqa.webquote1.ford.com&ct_orig_uri=%2Fap%2Fford%3FTARGET%3Dhttp%3A%2F%2Fwwwqa.webquote1.ford.com';
				
				}
			});
		}

		this.navigateToOrderToolTag = function () {
			$state.go('search-list')
		}
		
		this.navigateToUploadToolTag = function () {
			$state.go('choose-asset')
		}

		this.navigateToScanToolTag = function () {
			$state.go('scan-tool-tag')
		}
		
/*		this.navigateToMoreInfo = function () {
			$state.go('more-info')
		}*/

	}]);
