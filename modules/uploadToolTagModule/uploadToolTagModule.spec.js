'use strict';

describe('UploadToolTagModule:', function() {
	var NewUiAppNewTaxonomyModule;

	beforeEach(function() {
		NewUiAppNewTaxonomyModule = angular.module('NewUiAppNewTaxonomyModule');
	});

	it('should be registered', function() {
		expect(NewUiAppNewTaxonomyModule).toBeDefined();
	});

});