'use strict';

angular.module('OrderToolTagComponentsModule')
    .service('ViewHistoryModalServices', ['$uibModal', function ($uibModal) {

        this.open = function (currentAddress) {
            var modalInstance = $uibModal.open({
                templateUrl: 'toolTagApp/modules/orderToolTagModule/components/modals/ViewHistoryModal/viewHistoryModalTemplate.html',
                controller: 'ViewHistoryModalInstanceController as viewHistoryModalInstanceController',
                resolve: {
                    resolvedCurrentAddress: function () {
                        return currentAddress;
                    }
                }
            })

            return modalInstance.result;
        }
    }]);
