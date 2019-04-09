'use strict';

/**
 * @ngdoc module
 * @name OrderToolTagModule
 * @description The new taxonomy module
 * @requires WebCoreModule
 * @requires OrderToolTagComponentsModule
 */
angular.module('OrderToolTagModule', [
	'WebCoreModule',
	'OrderToolTagComponentsModule'
]);

/*
 * New Taxonomy module configuration
 */
angular.module('OrderToolTagModule')
	.config(['$stateProvider',
		function ($stateProvider) {

			$stateProvider
				.state('tool-search', {
					'abstract':true,
					url: '/tool-search',
					templateUrl: 'toolTagApp/modules/orderToolTagModule/states/toolSearch/toolSearchTemplate.html',
					controller: 'ToolSearchController',
					controllerAs: 'toolSearchController',
					parent: 'tool-tag-ui-app'
				})
				.state('search-list', {
					url: '/search-list',
					templateUrl: 'toolTagApp/modules/orderToolTagModule/states/toolSearch/searchList/searchListTemplate.html',
					controller: 'SearchListController',
					controllerAs: 'searchListController',
					parent: 'tool-search'
				})
				.state('search-edit-address',{
					url: '/search-edit-address',
					templateUrl: 'toolTagApp/modules/orderToolTagModule/states/toolSearch/searchEditAddress/searchEditAddressTemplate.html',
					controller: 'SearchEditAddressController',
					controllerAs: 'searchEditAddressController',
					parent: 'tool-search',
					data: {
						selectedFordToolingAssetNumber: ''
					}
			})
			.state('select-tag-size',{
					url: '/select-tag-size',
					templateUrl: 'toolTagApp/modules/orderToolTagModule/states/toolSearch/selectTagSize/selectTagSizeTemplate.html',
					controller: 'SelectTagSizeController',
					controllerAs: 'selectTagSizeController',
					parent: 'tool-search',
					data: {
						selectedFordToolingAssetNumber: ''
					}
			})
			.state('select-multiple-tag-size',{
					url: '/select-multiple-tag-size',
					templateUrl: 'toolTagApp/modules/orderToolTagModule/states/toolSearch/selectTagSize/selectMultipleTagSizeTemplate.html',
					controller: 'SelectTagSizeController',
					controllerAs: 'selectTagSizeController',
					parent: 'tool-search',
					data: {
						selectedFordToolingAssetNumber: ''
					}
			})
			.state('confirm',{
					url: '/confirm',
					templateUrl: 'toolTagApp/modules/orderToolTagModule/states/toolSearch/confirm/confirmTemplate.html',
					controller: 'ConfirmController',
					controllerAs: 'confirmController',
					data:{
						confirm:''
					},
					parent: 'tool-search'
				})
		}
	]);

