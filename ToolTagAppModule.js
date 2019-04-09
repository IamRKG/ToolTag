'use strict';
/**
 * @ngdoc module
 * @name ToolTagAppModule
 * @description The root application module
 * @requires WebCoreModule
 * @requires ToolTagAppComponentsModule
 */
angular.module('ToolTagAppModule', [
    'WebCoreModule', 
    'ToolTagAppComponentsModule',
    'OrderToolTagModule',
    'ScanToolTagModule',
    'UploadToolTagModule'
]);
/*
 * Application module configuration
 */
angular.module('ToolTagAppModule')
    .config(['WcTranslateConfiguratorServiceProvider', '$urlRouterProvider', '$stateProvider',

            function (WcTranslateConfiguratorServiceProvider, $urlRouterProvider, $stateProvider) {

            $stateProvider
                .state('tool-tag-ui-app', {
                    'abstract': true,
                    url: '',
                    templateUrl: 'toolTagApp/toolTagAppTemplate.html',
                    controller: 'ToolTagAppController',
                    controllerAs: 'toolTagAppController'
                })   
                .state('help', {
                    url: '/help',
                    templateUrl: 'toolTagApp/userguide.html',
                    controller: 'GuideController'
                   
                })

                .state('home', {
                    url: '/home',
                    templateUrl: 'toolTagApp/states/home/homeTemplate.html',
                    controller: 'HomeController',
                    controllerAs: 'homeController',
                    parent: 'tool-tag-ui-app'
                });
 
            
            $urlRouterProvider.when('', '/home');
            $urlRouterProvider.when('/', '/home');
            $urlRouterProvider.otherwise('/');

            WcTranslateConfiguratorServiceProvider.configureTranslateService({loaderObj: {urlTemplate: 'translations/{lang}/{part}.json'},});
        }
    ])
    .run(['WcHttpRequestService', 'WcWebtrendsService', 'WcTranslateConfiguratorService','userProfileService', '$rootScope','$timeout',
        function(WcHttpRequestService, WcWebtrendsService, WcTranslateConfiguratorService, userProfileService, $rootScope,$timeout) {

            WcHttpRequestService.configureDefaults({baseUrl: '/WQ/rest/'});

            WcTranslateConfiguratorService.loadPartAndRefresh('en_us_translation');
            // Enable Webtrends for App
            WcWebtrendsService.enable();

            var userInformationArray = document.cookie.split(";");
            
            var userDataJson;
            for(var i =0; i < userInformationArray.length; i++){
            	var userObjectArray = userInformationArray[i].split("=");

            	if(userObjectArray[0] == "UserInformation"){
            		userDataJson = userObjectArray;
            	}
            }

            $rootScope.$on('$stateChangeSuccess',function (event, toState, toParams, fromState, fromParams) {
                $timeout.cancel(fromParams);
                if(toState.name != 'scan-tool-tag'){
                    var stream = window.stream;
                    if(stream != undefined){
                    stream.getTracks().forEach(function(t) { t.stop(); } );
                    }
                }
            });


            userProfileService.setUserProfileInSessionStorage(userDataJson);
            WcHttpRequestService.configuration.headers = {AuthorizationToken: JSON.parse(userDataJson[1]).userAuthToken};
            WcHttpRequestService.configuration.timeout = 300000;
            $rootScope.message= 'Tool Tag is invalid<br>Please reorder the tool tag';
            $rootScope.menuCollapsed = true;
            $rootScope.toggleMenuCollpase = function() {
            	$rootScope.menuCollapsed = !$rootScope.menuCollapsed;
            }
            $rootScope.collpaseHamburgerMenu = function() {
            	$rootScope.menuCollapsed = true;
            }
            
        }]).filter('unsafe', function($sce) {
            return function(val) {
                return $sce.trustAsHtml(val);
            };
        });