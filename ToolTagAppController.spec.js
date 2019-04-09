'use strict';

describe('ToolTagAppModule NewUiAppController:', function() {
	var scope = null,
		$httpBackend, $controller, $q;		

	var newUiAppController = function() {
		var controller = $controller('NewUiAppController as newUiAppController', {
			$scope: scope
		});
		return controller;
	};

	beforeEach(function() {
		module('ToolTagAppModule');

		inject(function($rootScope, $injector) {
			scope = $rootScope.$new();
			$controller = $injector.get('$controller');				
			$httpBackend = $injector.get('$httpBackend');
			$q = $injector.get('$q');
		});

		newUiAppController();

		$httpBackend.when('GET', '').respond(200);
	});

	it('should be registered', function() {
		expect(newUiAppController).toBeDefined();
	});

	it('should have a Scope', function() {
		expect(scope).toBeDefined();
	});

});