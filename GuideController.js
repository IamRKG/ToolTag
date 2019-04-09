
angular.module('ToolTagAppModule')
.controller('GuideController', function($scope, $location, $anchorScroll) {
  $scope.scrollTo = function(id) {
    $location.hash(id);
    console.log($location.hash());
    $anchorScroll();
  };
});