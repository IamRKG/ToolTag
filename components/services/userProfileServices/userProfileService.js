'use strict';

angular.module('ToolTagAppComponentsModule').
	service('userProfileService',['$window',function($window){

		this.userInformation = {};

	    this.setUserProfileInSessionStorage = function(userDataJson) {
	    	sessionStorage.setItem(userDataJson[0], userDataJson[1]);
			this.userInformation = JSON.parse(userDataJson[1]);
		};
		
		this.getUserProfileFromSessionStorage = function(){
			this.userInformation = JSON.parse(sessionStorage.getItem('UserInformation'));
			return this.userInformation;
		};

		this.clearUserInformation = function (){
				sessionStorage.clear();
				this.userInformation = undefined;
			};
			
}]);