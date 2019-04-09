'use strict';

describe('UploadToolTagComponentsModule:', function() {
	var NewUiAppNewTaxonomyComponentsModule;

	beforeEach(function() {
		NewUiAppNewTaxonomyComponentsModule = angular.module('NewUiAppNewTaxonomyComponentsModule');
	});

	it('should be registered', function() {
		expect(NewUiAppNewTaxonomyComponentsModule).toBeDefined();
	});

});