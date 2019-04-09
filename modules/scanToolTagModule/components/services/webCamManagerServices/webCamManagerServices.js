angular.module('scanToolTagComponentsModule')
    .service('webCamManagerServices',['cameraSourceService',function (cameraSourceService) {

        this.getWebCam = function (cameraRoot) {

            var cameraVideo = cameraRoot.querySelector('.Camera-video');
            cameraVideo.getBoundingClientRect();

            cameraVideo.addEventListener('loadeddata', function() {

                var height = window.innerHeight;
                var width = window.innerWidth;

                var heightRatio = cameraVideo.videoHeight / height;
                var widthRatio = cameraVideo.videoWidth / width;

                var scaleFactor = 1;

                // if the video is physcially smaller than the screen
                if(height > cameraVideo.videoHeight && width > cameraVideo.videoWidth) {
                    scaleFactor = 1 / Math.max(heightRatio, widthRatio);
                }
                else {
                    scaleFactor = 1 / Math.min(heightRatio, widthRatio);
                }

                cameraVideo.style.transform = 'translate(-50%, -50%) scale(' + scaleFactor + ')';
            });

            cameraSourceService.getCamerasource(cameraVideo)

            this.getDimensions = function() {
                return cameraSourceService.getDimensions();
            };


            cameraSourceService.getCameras(function() {
                cameraSourceService.setCamera(0);
            });

            cameraSourceService.onframeready = function(imageData) {
                this.onframeready(imageData);
            }.bind(this);

            document.addEventListener('visibilitychange', function(e) {

                if(document.visibilityState === 'hidden'){
                    cameraSourceService.stop();
                }else{
                    cameraSourceService.start();
                }

            });

        }
        
    }]);