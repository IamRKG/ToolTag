'use strict';

angular.module('OrderToolTagModule')
    .controller('ConfirmController',['$state',function ($state) {
    	this.isListShow = false;
    	this.searchList = JSON.parse(sessionStorage.getItem('toolSearchResult'));
    	for(var i=0; i<this.searchList.length; i++) {
    		if(this.searchList[i].toolTagReOrderCount >= 4 && this.searchList[i].toolTagReOrderCount < 7) {
    			this.isListShow = true;
    		}
    	}
        console.log(this.searchList);
    }]);