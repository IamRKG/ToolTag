'use strict';

angular.module('UploadToolTagModule')
    .controller('ChooseAssetController', ['_', '$state', '$stateParams', 'toolTrackingSheetsService', '$scope', 'WcAlertConsoleService', '$translate', '$timeout', 'viewHistorySessionStorageServices', 'userProfileService', function(_, $state, $stateParams, toolTrackingSheetsService, $scope, WcAlertConsoleService, $translate, $timeout, viewHistorySessionStorageServices, userProfileService) {
    	 $scope.strLimit = 50;
    	if(JSON.parse(sessionStorage.getItem('chooseAssetResult'))) {
        	this.toolSearchResult = JSON.parse(sessionStorage.getItem('chooseAssetResult'));
        } else {
        this.toolSearchResult = [];
        }
       // this.toolSearchResult = []
        var searchForm = document.querySelector('.search');
        this.toolSearch = function() {
        //	sessionStorage.setItem('chooseAssetResult', JSON.stringify({name:"mukesh", gender: "male"}));
            if (this.searchToolOrderForm.$valid) {
                this.param = {
                    toolOrderNumber: this.toolOrderNumber,
                    fordAssetNumber: this.fordAssetNumber,
                    loginToken: userProfileService.getUserProfileFromSessionStorage().userAuthToken
                };

                toolTrackingSheetsService.searchTool(this.param).then(angular.bind(this, function(response) {
                    this.toolSearchResultProcess(response);
                    sessionStorage.setItem('chooseAssetResult', JSON.stringify(this.toolSearchResult));
                    return this.toolSearchResult;
                }));
            } else {
                this.isFormSubmitted = true;
            }
        };
        
      

        this.toolSearchEnter = function(e) {
            if (e.charCode === 13) {
                this.toolSearch();
            }

        }

        this.toolSearchResultProcess = function(result) {
            this.updateToolTagShippingLocation = result.toolTrackingSheetMobileList;
            this.countryList = result.countryList;
            this.toolSearchResult = this.updateToolTagShippingLocation;
            /*this.initShowMore(this.toolSearchResult)*/
        }

        this.searchOrderNumber = {
            orderListSearch: [{
                "id": "0",
                "name": "Tool Order Number"
            }, {
                "id": "1",
                "name": "Ford Asset Number"
            }]
        };

        this.selectedSearch = this.searchOrderNumber.orderListSearch[0].id;

        this.toggleNumber = function() {
            this.toolOrderNumber = undefined;
            this.fordAssetNumber = undefined;
            this.isFormSubmitted = false;
        }
/*
        this.initShowMore = function(getToolSearchResult) {
            $timeout(function() {
                for (var i = 0; i < getToolSearchResult.length; i++) {
                    if (getToolSearchResult[i].toolingDesc.length > 115) {
                        var searchForm = document.querySelector('.search');
                        var showLessContent = getToolSearchResult[i].toolingDesc.substring(0, 115);
                        var toolingDesc = searchForm.querySelectorAll('.toolingDesc');
                        var fordToolingAssetNumber = getToolSearchResult[i].fordToolingAssetNumber
                        toolingDesc[i].id = fordToolingAssetNumber;
                        toolingDesc[i].textContent = showLessContent + '...';
                        toolingDesc[i].insertAdjacentHTML('beforeend', '<div class="text-right"><a id="' + [i] + '" name="' + fordToolingAssetNumber + '" class="showMore" rel="ShowMoreAndLess">Show More</a></div>')
                    }
                }
            })
        }

*/
        this.uploadHomeFor = function(assetNumber, assetKey) {
            $state.go('upload-home', {
                paramOne: {
                    assetNumber: assetNumber,
                    assetKey: assetKey
                }
            });
        };
        
        this.viewMessage = function(toolTagAttachmentCount){
        	//ViewMessageDescriptionModalServices.open(toolTagOrderCount)
        	return messageDescription(toolTagAttachmentCount);
        	//console.log(this.message);
        };
        
        function messageDescription(toolTagAttachmentCount) {
    		if(toolTagAttachmentCount > 0 ){
    			return "You have uploaded "+toolTagAttachmentCount+" attachments for this asset."
    			
    		} 
             return "No Message";
         }

/*        var showHideDesc = function(event) {
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
                case 'showLess':
                    fordToolingAssetNumberElement.textContent = getToolSearchResult[eventTargetId].toolingDesc.substring(0, 115) + '...';
                    fordToolingAssetNumberElement.insertAdjacentHTML('beforeend', '<div class="text-right"><a id="' + [eventTargetId] + '" name="' + eventTargetName + '" class="showMore" rel="ShowMoreAndLess">Show More</a></div>')
                    break;
                default:
            };
        };

        var toggleContent = function(event) {
            switch (event.target.rel) {
                case 'ShowMoreAndLess':
                    showHideDesc(event);
                    break;
                default:
            }
        };
        searchForm.addEventListener('click', toggleContent)*/
    }]);