'use strict';

angular.module('OrderToolTagComponentsModule')
    .service('ToolLocationModalServices',['$uibModal',function ($uibModal) {

        this.open = function(result,countryList,states) {
            var editFordAssetNumber = angular.copy(result);
            var modalInstance = $uibModal.open({
                templateUrl: 'toolTagApp/modules/orderToolTagModule/components/modals/toolLocationModalTemplate.html',
                controller: 'ToolLocationModalInstanceController as toolLocationModalInstanceController',
                resolve:{
                    address:function () {
                        return editFordAssetNumber;
                    },
                    resolvedCountryList:function () {
                        return countryList
                    },
                    resolvedStatesList:function () {
                        return states
                    }
                }
            });

            return modalInstance.result;
        };

    }]);