'use strict';

angular.module('OrderToolTagModule')

    .controller('SearchListController', ['_', '$state', '$scope', 'WcAlertConsoleService', '$translate', '$anchorScroll', 'viewHistorySessionStorageServices','ViewMessageDescriptionModalServices', function (_, $state, $scope, WcAlertConsoleService, $translate, $anchorScroll, viewHistorySessionStorageServices,ViewMessageDescriptionModalServices) {
    	 $scope.strLimit =50;
        this.fordAssetNumber = [];
        /*var searchForm = document.querySelector('.search');
        $scope.$parent.toolSearchController.initShowMore($scope.$parent.toolSearchController.toolSearchResult)

     */   this.selectAll = function () {
            var listSearchList = $scope.$parent.toolSearchController.toolSearchResult

            for (var i = 0; i < listSearchList.length; i++) {
            	if(!$('input[type=checkbox]')[i].disabled){            		
            		$('input[type=checkbox]')[i].checked = true;
            		var fordToolingAssetNumber = listSearchList[i].fordToolingAssetNumber
            		this.selectedSearchList(fordToolingAssetNumber)
            	}
            }
        };

        this.selectNone = function () {
            var listSearchList = $scope.$parent.toolSearchController.toolSearchResult

            this.selectedSearchResult = [];
            for (var i = 0; i < listSearchList.length; i++) {
                $('input[type=checkbox]')[i].checked = false;
            }
        };

        this.selectedSearchResult = [];
        this.selectedFordToolingAssetNumber = [];

        this.selectedSearchList = function (Number) {
            var listSearchList = $scope.$parent.toolSearchController.toolSearchResult

            this.selectedSearchResult = [];
            if (typeof Number === 'string') {
                this.fordAssetNumber.push(Number);
            } else {
                this.fordAssetNumber = Number
            }
            for (var i = 0; i < listSearchList.length; i++) {
                var checkboxName = $('input[type=checkbox]')[i];
                if (checkboxName.checked == true) {
                    if (this.fordAssetNumber.indexOf(checkboxName.id) != -1) {
                        this.selectedSearchResult.push(listSearchList[i]);
                    }
                }
            }
        }
  
        
        $scope.showMore = function(desc) {
            $scope.strLimit = desc.length;
          };

         // Event trigger on click on the Show less button.
          $scope.showLess = function(desc) {
            $scope.strLimit = 50;
          };

        this.orderToolTag = function(){
        	if(this.selectedSearchResult.length > 0){
               /* $state.get('select-tag-size').data.selectedFordToolingAssetNumber = this.selectedSearchResult;
                $state.go('select-tag-size')   */  
        		 $state.get('search-edit-address').data.selectedFordToolingAssetNumber = this.selectedSearchResult;
                 $state.go('search-edit-address');
        	} else {
                this.isSelectOne = true;
                $anchorScroll();
            }
        }
        
        this.viewMessage = function(toolTagOrderCount){
        	//ViewMessageDescriptionModalServices.open(toolTagOrderCount)
        	return messageDescription(toolTagOrderCount);
        	//console.log(this.message);
        };
        
        function messageDescription(toolTagOrderCount) {

    		if(toolTagOrderCount >= 0 && toolTagOrderCount < 4){
    			return "You have placed "+toolTagOrderCount+" tool tag orders for this asset"
    			
    		} else if (toolTagOrderCount >= 4 && toolTagOrderCount < 6){
    			return " 4 tool tag orders have been placed for this asset.If you are experiencing issues with your tool tags, please submit a WebQuote ticket at the <a href='http://www.request.ford.com' >Help Desk</a>" ;
    		} else {
    			return "Asset selection disabled for tool tag orders due to high volume of tag orders in the past. Please contact the Ford Buyer for further information."
    		}
             return "No Message";
         }
/*
        var showHideDesc = function (event) {
            var getToolSearchResult = viewHistorySessionStorageServices.getMobileToolSheet().toolTrackingSheetMobileList;
            var eventTargetId = event.target.id
            var eventTargetName = event.target.name
            var panelBodyElement = searchForm.querySelectorAll('.panel-body');
            var fordToolingAssetNumberElement = panelBodyElement[eventTargetId].querySelector('#' + eventTargetName);
            switch (event.target.className) {
                case 'showMore':
                    fordToolingAssetNumberElement.textContent = getToolSearchResult[eventTargetId].toolingDesc;
                    fordToolingAssetNumberElement.insertAdjacentHTML('beforeend', '<div class="text-right"><a id="' + [eventTargetId] + '" name="' + eventTargetName + '" class="showLess" rel="ShowMoreAndLess">Show Less</a></div>')
                    break;
                case  'showLess':
                    fordToolingAssetNumberElement.textContent = getToolSearchResult[eventTargetId].toolingDesc.substring(0, 115) + '...';
                    fordToolingAssetNumberElement.insertAdjacentHTML('beforeend', '<div class="text-right"><a id="' + [eventTargetId] + '" name="' + eventTargetName + '" class="showMore" rel="ShowMoreAndLess">Show More</a></div>')
                    break;
                default:
            };
        };

        var toggleContent = function (event) {
            switch (event.target.rel) {
                case 'ShowMoreAndLess':
                    showHideDesc(event);
                    break;
                default:
            }
        };
        searchForm.addEventListener('click', toggleContent)*/
    }])
.directive('toolpopover', function () {
	  
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