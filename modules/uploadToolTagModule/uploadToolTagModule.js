angular.module('UploadToolTagModule', [
    'WebCoreModule',
    'UploadToolTagComponentsModule'
]);

angular.module('UploadToolTagModule')
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('choose-asset', {
                    url: '/chooseAsset',
                    templateUrl: 'toolTagApp/modules/uploadToolTagModule/states/chooseAsset/chooseAssetTemplate.html',
                    controller: 'ChooseAssetController',
                    controllerAs: 'chooseAssetController',
                    parent: 'tool-tag-ui-app'
                })
                
                .state('upload-home',{
                	url: '/uploadHome',
                	templateUrl: 'toolTagApp/modules/uploadToolTagModule/states/uploadHome/uploadHomeTemplate.html',
                    controller: 'UploadHomeController',
                    params: {
						paramOne: { assetNumber : "defaultValueOne", assetKey : "defaultValueTwo"}
					},
                    controllerAs: 'uploadHomeController',
                    parent: 'tool-tag-ui-app'
                })
                
                 .state('upload-result',{
                	url: '/uploadResult',
                	templateUrl: 'toolTagApp/modules/uploadToolTagModule/states/uploadResult/uploadResultTemplate.html',
                    controller: 'UploadResultController',
                    params: {
						paramOne: { message : "defaultValueOne"}
					},
                    controllerAs: 'uploadResultController',
                    parent: 'tool-tag-ui-app'
                })
        }
    ]);

