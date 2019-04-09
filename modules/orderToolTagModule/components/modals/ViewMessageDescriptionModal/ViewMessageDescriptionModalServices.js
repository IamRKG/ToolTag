'use strict';

angular.module('OrderToolTagComponentsModule')
    .service('ViewMessageDescriptionModalServices',['$uibModal',function ($uibModal) {

        this.open = function(toolTagOrderCount) {
        	var modalInstance = $uibModal.open({
                templateUrl: 'toolTagApp/modules/orderToolTagModule/components/modals/ViewMessageDescriptionModal/viewMessageDescriptionModalServicesTemplate.html',
                controller: 'ViewMessageDescriptionModalInstanceController as viewMessageDescriptionModalInstanceController',
                resolve:{
                	messageDescription: function () {

                		if(toolTagOrderCount >= 1 && toolTagOrderCount < 4){
                			return "You have placed "+toolTagOrderCount+" tool tag orders for this asset"
                			
                		} else if (toolTagOrderCount >= 4 && toolTagOrderCount < 6){
                			return toolTagOrderCount+" tool tag orders have been placed for this asset.If you are experiencing issues with your tool tags, please submit a WebQuote ticket at www.request.ford.com"
                		} else {
                			return "Asset selection disabled for tool tag orders due to high volume of tag orders in the past. Please contact the Ford Buyer for further information"
                		}
                         return "No Message";
                     }
                }
            });

            return modalInstance.result;
        };

    }]);