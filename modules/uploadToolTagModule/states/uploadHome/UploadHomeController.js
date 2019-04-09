	'use strict';
	angular.module('UploadToolTagModule')
	    .controller('UploadHomeController', ['_', '$state','$stateParams', '$scope', 'WcAlertConsoleService','$translate', 
	    	'toolTrackingSheetsService', 'WcCameraService', '$timeout','userProfileService', function (_, $state, $stateParams, $scope, WcAlertConsoleService, $translate, toolTrackingSheetsService,
	    	WcCameraService, $timeout, userProfileService ) {
	       var vm = this;
	       vm.fordAssetNumber = $stateParams.paramOne.assetNumber;
	       vm.assetKey = $stateParams.paramOne.assetKey;
	     
	       this.fordAssetNumber = $stateParams.paramOne.assetNumber;
	       this.assetKey = $stateParams.paramOne.assetKey;
	       
	       if(this.fordAssetNumber != "defaultValueOne") {
	    	   sessionStorage.setItem('assetNo', this.fordAssetNumber);
	       } else {
	    	   this.fordAssetNumber = sessionStorage.getItem('assetNo');
	       }

	       $scope.selectedFiles = [];
	       $scope.filesUrls = [];
	       $scope.hoverEdit = true;
	       $scope.changedFiles = function(element) {
	    	   $scope.isSameFile = false;
	          if(element.files.length) {
	        	angular.forEach($scope.selectedFiles , function(oldfile) {
	        		angular.forEach(element.files, function(file) {
	        			if(angular.equals(oldfile, file)) {
	        				alert('Same file detected, please change file');
	        				$scope.isSameFile = true;
	        			}
	        	   })  
	        	});
	        	
	        	if(!$scope.isSameFile && isFileSizeChecked(element.files)) {
	            angular.forEach(element.files, function(file) {
	            $scope.selectedFiles.push(file);
	             var reader = new FileReader();
	                 reader.onload = function (e) {
	                     $scope.filesUrls.push(e.target.result);
	                 }
	                 reader.readAsDataURL(file);
	           });
	           
	          }
	          $timeout(function(){
	             }, 1000 );
	       }
	        
	       }
	       
	       function getShortNameFiles(files) {
	    	   for(var i=0; i< files.length; i++) {
	    		   var name = files[i].name;
	    		   var ext = name.split(".");
	    		   ext = ext[ext.length-1];
	    		   name = name.substring(0, 5);
	    		   files[i].shortName = name+"_"+i+"."+ext;
	    	   }
	    	   
	    	   return files;
	       }
	       
	       function isFileSizeChecked(files) {
	    	   var isFileSizeGreater = true;
	    	   angular.forEach(files, function(file) {
	    		   if(file.size > 10*1024*1024) {
	    			   alert("File - "+file.name+" size allowed to upload upto 10 MB.");
	    			   isFileSizeGreater = false;
	    			   return isFileSizeGreater;
	    		   }
	    	   } );
	    		 
	    	return isFileSizeGreater;
	       }
	       
	       vm.upload = function(){
	    	   var fileArray = [];
		    	var attachmentType;
		    	for(var i in getShortNameFiles($scope.selectedFiles)) {
		    		attachmentType = {
		    				//attachmentId: 0,
		    				name: $scope.selectedFiles[i].shortName,
		    				contentType: $scope.selectedFiles[i].type,
		    				file: $scope.selectedFiles[i],
		    				userId: userProfileService.getUserProfileFromSessionStorage().userId
		    		}
		    		fileArray.push(attachmentType);
		    	}
		    	console.log(fileArray);
		    	vm.param = {
		    			loginToken: userProfileService.getUserProfileFromSessionStorage().userAuthToken,
		    			fordToolingAssetNumber: vm.fordAssetNumber,
		    			fordAssetToolingKey: vm.assetKey,
		    			uploadedPictures: fileArray
		    	}
		    /*	console.log(vm.param);
		         toolTrackingSheetsService.uploadPhoto(vm.param).then(angular.bind(vm, function (response) {
                    console.log(response);
                })
                );*/
		    	
		    	var message = toolTrackingSheetsService.uploadPhoto($scope.selectedFiles, this.assetKey, this.fordAssetNumber);
	       };
	      
	    	     vm.takeNewPhoto = function() {
	    	    	 $timeout( function(){
	    	    		 $("#uploadCapturedFile:hidden").trigger('click');
	 	    	         
	    	    	 });
	    	    	  }
	    	     
	    	     vm.selectFromGallery = function(e) {
	    	    	 $timeout( function(){
	    	    	    $("#uploadFile:hidden").trigger('click');
	    	    	 });
	    	     }
	    	    
	        	    $scope.deletePhoto = function(index) {
	        	    	$scope.filesUrls.splice(index, 1);
	        	    }
	    	     
	    	     
	    	     function handleError(response, data) {
	 		    	console.log("error:"+response);
	 		      if (!angular.isObject(response.data) ||!response.data.message) {
	 		        return ($q.reject("An unknown error occurred."));
	 		      }
	 	
	 		      return ($q.reject(response.data.message));
	 		    }
	 	
	 		    function handleSuccess(response) {
	 		    	console.log(response);
	 		      return (response);
	 		    }
	    }])
		  .directive('ngFileModel', ['$parse', function ($parse) {
			    return {
			        restrict: 'A',
			        link: function (scope, element, attrs) {
			            var model = $parse(attrs.ngFileModel);
			            var isMultiple = attrs.multiple;
			            var modelSetter = model.assign;
			            element.bind('change', function () {
			                var values = [];
			                angular.forEach(element[0].files, function (item) {
			                    var value = {
			                       // File Name 
			                        name: item.name,
			                        //File Size 
			                        size: item.size,
			                        //File URL to view 
			                        url: URL.createObjectURL(item),
			                        // File Input Value 
			                        _file: item
			                    };
			                    values.push(value);
			                });
			                scope.$apply(function () {
			                    if (isMultiple) {
			                        modelSetter(scope, values);
			                    } else {
			                        modelSetter(scope, values[0]);
			                    }
			                });
			            });
			        }
			    };
			}]);