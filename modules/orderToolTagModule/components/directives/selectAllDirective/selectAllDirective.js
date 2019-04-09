'use strict';

angular.module('OrderToolTagComponentsModule').
    directive('selectAllTool',[ function () {
        return{
            restrict: 'A',
            link:function (scope, elem) {
                var checkboxList = elem.find('input[type="checkbox"]');
                angular.forEach(checkboxList, function(chkBox) {
                    chkBox.checked = true;
                })
            }
        }
}]);