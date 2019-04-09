'use strict';

angular.module('OrderToolTagComponentsModule')
    .controller('ViewMessageDescriptionModalInstanceController',['$scope', '$uibModalInstance','messageDescription', function ($scope, $uibModalInstance,messageDescription) {

    	this.messageDescription = messageDescription;
        
        this.reject = function() {
            $uibModalInstance.dismiss();
        };

        this.resolve = function () {
            $uibModalInstance.close();
        };

    }]);