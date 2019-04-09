'use strict';

angular.module('OrderToolTagModule')
    .controller('SelectTagSizeController', ['$scope', '$state', 'ToolLocationModalServices', 'toolTrackingSheetsService', 'ViewComponentPartNumbersService', 'ViewComponentPartsModalServices', 'statesServices', 'WcAlertConsoleService', '$translate', 'countryFactory', 'toolTrackingSheetMobileListFactory', 'ViewHistoryModalServices', '$anchorScroll','$timeout','userProfileService', function ($scope, $state, ToolLocationModalServices, toolTrackingSheetsService, ViewComponentPartNumbersService, ViewComponentPartsModalServices, statesServices, WcAlertConsoleService, $translate, countryFactory, toolTrackingSheetMobileListFactory, ViewHistoryModalServices, $anchorScroll, $timeout, userProfileService) {
        
    	
    	
        this.toolTrackingSheetList = $state.current.data.selectedFordToolingAssetNumber;
        
        this.toolTrackingSheetSelectAll = {
        		fordToolingAssetNumber:"Select All",
        		toolTagSize:""
        }
        
        this.toolTrackingSheetList.splice(0,0,this.toolTrackingSheetSelectAll);
        
        var selectedTrackingSheet = [];
        
        this.loadTagSize = function () {
            this.toolTagSize = selectedTrackingSheet.toolTagSize;
        }
        
        this.selectAllFor = function(value){
        	this.toolTrackingSheetList.forEach(function(trackingSheet){
        		trackingSheet.toolTagSize = value;
        	});
        }
        
        if (!Array.prototype.remove) {
        	  Array.prototype.remove = function(val) {
        	    var i = this.indexOf(val);
        	         return i>-1 ? this.splice(i, 1) : [];
        	  };
        	}
        
        
        this.next = function () {
        	        	
        	var toolTrackingSheetSelectAll = this.toolTrackingSheetList[0];
        		if(!toolTrackingSheetSelectAll.toolTagSize == ""){
        			this.selectAllFor(toolTrackingSheetSelectAll.toolTagSize);
        		}
/*        		alert(toolTrackingSheetSelectAll.fordToolingAssetNumber)
            	alert(toolTrackingSheetSelectAll.toolTagSize)*/
            	
        	//this.toolTrackingSheetList.splice(0,1);
            	
            	var toolTrackingLoopingSheets = this.toolTrackingSheetList
            	
            	var toolTrackingSheets = this.toolTrackingSheetList
        		
            	toolTrackingLoopingSheets.forEach(function(trackingSheet){
        		if(trackingSheet.fordToolingAssetNumber == "Select All"){
        			toolTrackingSheets.remove(trackingSheet);
        		}
        		
        	});
        		this.toolTrackingSheetList = toolTrackingSheets
        		
            if (this.toolTrackingSheetList.length > 0) {
                $state.get('search-edit-address').data.selectedFordToolingAssetNumber = this.toolTrackingSheetList;
                $state.go('search-edit-address')
            } else {
                this.isSelectOne = true;
                $anchorScroll();

            }
        }
        
        this.updateMultipleTagSize = function (toolTrackingSheetList) {
    		//alert(this.toolTrackingSheetList.length)
        	//this.toolTrackingSheetList.splice(0,1);
        	var toolTrackingLoopingSheets = this.toolTrackingSheetList
        	
        	var toolTrackingSheets = this.toolTrackingSheetList
    		
        	toolTrackingLoopingSheets.forEach(function(trackingSheet){
    		if(trackingSheet.fordToolingAssetNumber == "Select All"){
    			toolTrackingSheets.remove(trackingSheet);
    		}
        	});
        	
    		this.toolTrackingSheetList = toolTrackingSheets
    		//alert(this.toolTrackingSheetList.length)
    		
            if (this.toolTrackingSheetList.length > 0) {
                $state.get('select-multiple-tag-size').data.selectedFordToolingAssetNumber = this.toolTrackingSheetList;
                $state.go('select-multiple-tag-size')
            } else {
                this.isSelectOne = true;
                $anchorScroll();

            }
        }
        
        this.back = function(){
        	if(this.toolTrackingSheetList.length > 0){
                $state.get('select-tag-size').data.selectedFordToolingAssetNumber = this.toolTrackingSheetList;
                $state.go('select-tag-size')        		
        	} else {
                this.isSelectOne = true;
                $anchorScroll();
            }
        }

    }]);