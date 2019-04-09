angular.module('ScanToolTagModule', [
    'WebCoreModule',
    'scanToolTagComponentsModule'
]);

angular.module('ScanToolTagModule')
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('scan-tool-tag', {
                    url: '/scan-tool-tag',
                    templateUrl: 'toolTagApp/modules/scanToolTagModule/states/scanToolTag/scanToolTagTemplate.html',
                    controller: 'ScanToolTagController',
                    controllerAs: 'scanToolTagController',
                    parent: 'tool-tag-ui-app'
                })
                .state('qr-result', {
                    url: '/qr-result',
                    templateUrl: 'toolTagApp/modules/scanToolTagModule/states/qrScanResult/qrScanResultTemplate.html',
                    controller: 'QRScanResultController',
                    controllerAs: 'qrScanResultController',
                    data:{
                        qrResult:''
                    },
                    parent: 'tool-tag-ui-app'
                })
                
                .state('more-info', {
					url: '/more-info',
					templateUrl: 'toolTagApp/modules/scanToolTagModule/states/viewInfo/viewMoreInformationTemplate.html',
					controller: 'ViewMoreInformationController',
					params: {
						paramOne: { assetNumber : "defaultAssetNumber"}
					},
					controllerAs: 'viewMoreInformationController',
					parent: 'tool-tag-ui-app'
				})
        }
    ]);

