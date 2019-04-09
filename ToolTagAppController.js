'use strict';

/**
 * @ngdoc controller
 * @module ToolTagAppModule
 * @name ToolTagAppController
 * @requires Constants
 * @requires $anchorScroll
 * @requires $timeout
 * @description
 * The ToolTagAppController loads the angular version, webcore version and the templates for the application
 */
angular.module('ToolTagAppModule')
	.controller('ToolTagAppController', ['Constants', '$anchorScroll', '$timeout', function (Constants, $anchorScroll, $timeout) {

		this.headerTemplateURL = 'toolTagApp/toolTagAppHeaderTemplate.html';

		/**
		 * @ngdoc method
		 * @name scrollToContent
		 * @methodOf ToolTagAppModule.controller:ToolTagAppController
		 * @description
		 * The method provides scroll option across all the pages based on HTML element id.
		 * Needed by the skip to content link to properly scroll to an id in an angular app
		 */
		this.scrollToContent = function () {
			$anchorScroll('content');
			//focus on first child of content that is focusable
			$timeout(function () {
				angular.element('#content input, #content textarea, #content select, #content button, #content a')[0].focus();
			}, 0);
		};
	}]);