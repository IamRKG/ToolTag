angular.module('scanToolTagComponentsModule')
    .service('cameraManagerServices',['webCamManagerServices','cameraSourceService',function (webCamManagerServices,cameraSourceService) {

        this.getCamera = function (element) {

            var self = this;

            var gUM = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia || null);

            var root = document.getElementById(element);
            var cameraRoot = root.querySelector('.CameraRealtime');

            if(gUM === null){
                console.log("Camera not found for web@work")
            }else{
                webCamManagerServices.getWebCam(cameraRoot);
            }

            cameraRoot.classList.remove('hidden');
            var cameraCanvas = root.querySelector('.Camera-display');
            var cameraOverlay = root.querySelector('.Camera-overlay');
            var context = cameraCanvas.getContext('2d');

            // Variables
            var wHeight;
            var wWidth;
            var dWidth;
            var dHeight;
            var dx = 0;
            var dy = 0;

            var sx = 0;
            var sy = 0;
            var sHeight;
            var sWidth;
            var scaleX;
            var scaleY;
            var scaleFactor = 1;

            var coordinatesHaveChanged = true;


            var overlayCoords = { x:0, y: 0, width: cameraCanvas.width, height: cameraCanvas.height };

                webCamManagerServices.onframeready = function (frameData) {

                    setupVariables();

                    context.drawImage(frameData, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

                    drawOverlay(wWidth, wHeight);

                    if(self.onframe) self.onframe(context);

                    coordinatesHaveChanged = false;

                }

            var getOverlayDimensions = function(width, height) {
                var minLength = Math.min(width, height);
                var paddingHeight = (height + 64 - minLength) / 2;
                var paddingWidth = (width + 64 - minLength) / 2;

                return {
                    minLength: minLength,
                    width: minLength - 64,
                    height: minLength - 64,
                    paddingHeight: paddingHeight,
                    paddingWidth: paddingWidth
                };
            }

            var drawOverlay = function(width, height) {

                var overalyDimensions = getOverlayDimensions(width, height);

                var boxHeightSize = height / 2;
                var boxWidthSize = width / 2;
                var boxPaddingHeightSize = overalyDimensions.paddingHeight;
                var boxPaddingWidthSize = overalyDimensions.paddingWidth;

                if(coordinatesHaveChanged) {
                    cameraOverlay.style.borderTopWidth = boxPaddingHeightSize + "px";
                    cameraOverlay.style.borderLeftWidth = boxPaddingWidthSize + "px";
                    cameraOverlay.style.borderRightWidth = boxPaddingWidthSize + "px";
                    cameraOverlay.style.borderBottomWidth = boxPaddingHeightSize + "px";

                    overlayCoords.x = boxWidthSize;
                    overlayCoords.y = boxHeightSize;
                    overlayCoords.width = width;
                    overlayCoords.height = height;
                    coordinatesHaveChanged = false;
                }
            };


            var setupVariables = function(e) {
                var sourceDimensions = cameraSourceService.getDimensions();

                if(cameraCanvas.width == window.innerWidth && sourceDimensions.shouldLayout)
                    return;

                wHeight = window.innerHeight;
                wWidth = window.innerWidth;

                // Video source size
                var sourceHeight = sourceDimensions.height;
                var sourceWidth = sourceDimensions.width;

                // Target size in device co-ordinats
                var overlaySize = getOverlayDimensions(wWidth, wHeight);

                // The mapping value from window to source scale
                scaleX = (sourceWidth / wWidth );
                scaleY = (sourceHeight / wHeight);

                // if the video is physcially smaller than the screen
                if(wHeight > sourceHeight && wWidth > sourceWidth) {
                    scaleFactor = 1 / Math.max(scaleY, scaleX);
                }
                else {
                    scaleFactor = 1 / Math.min(scaleY, scaleX);
                }

                // The canvas should be the same size as the video mapping 1:1
                dHeight = dWidth = overlaySize.width / scaleFactor ;

                // The width of the canvas should be the size of the overlay in video size.
                if(dWidth == 0)
                cameraCanvas.width =  dWidth;
                cameraCanvas.height = dWidth;

                dx = 0;
                dy = 0;

                sx = 0;
                sy = 0;

                // Trim the left
                sx = ((sourceWidth / 2) - (dWidth / 2));
                sy = ((sourceHeight / 2) - (dHeight / 2));

                // Trim the right.
                sWidth = dWidth;
                sHeight = dHeight;

                return (sourceWidth > 0);
            };

            window.addEventListener('resize', function(e) {
                coordinatesHaveChanged = true;
                setupVariables();
            }.bind(this));

        }

    }]);