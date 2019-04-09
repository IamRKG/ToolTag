'use strict';

describe('OrderToolTagComponentsModule:', function() {
	var NewUiAppNewTaxonomyComponentsModule;

	beforeEach(function() {
		NewUiAppNewTaxonomyComponentsModule = angular.module('NewUiAppNewTaxonomyComponentsModule');
	});

	it('should be registered', function() {
		expect(NewUiAppNewTaxonomyComponentsModule).toBeDefined();
	});

});