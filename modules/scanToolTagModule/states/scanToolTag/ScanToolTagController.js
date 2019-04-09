"use strict";

angular.module("ScanToolTagModule")
    .controller("ScanToolTagController", ["$state", "QRScanResultModalServices", "$timeout",function ($state, QRScanResultModalServices, $timeout) {

        var toolTagQRCodeInit = function() {

            var toolTagCameraManager = new ToolTagCameraManager("camera");
            var toolTagQRCodeManager = new ToolTagQRCodeManager();

            var processingFrame = false;

            toolTagCameraManager.onframe = function (context) {
                if(processingFrame === false){
                    processingFrame = true;
                    var detectedQRCode = toolTagQRCodeManager.detectQRCode(context,function (toolTagDetails) {
                        if(toolTagDetails !== undefined){
                            $timeout.cancel(timeOut);
                            timeOut = undefined;
                            $state.go("qr-result");
                            $state.get("qr-result").data = toolTagDetails;
                        }

                        processingFrame = false;
                    });
                }
            };
        };

        var ToolTagQRCodeManager = function () {
            var client = new QRClient();
            this.detectQRCode = function(context, callback) {
                callback = callback || function() {};
                client.decode(context, function(result) {
                    callback(result);
                });
            };
        };

        var ToolTagWebCamManager = function (cameraRoot) {

            var cameraVideo = cameraRoot.querySelector(".Camera-video");

            cameraVideo.addEventListener("loadeddata", function() {

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

                cameraVideo.style.transform = "translate(-50%, -50%) scale(" + scaleFactor + ")";
            });

            var toolTagCameraSource = new ToolTagCameraSource(cameraVideo);

            this.getDimensions = function() {
                return toolTagCameraSource.getDimensions();
            };

            toolTagCameraSource.getCameras(function() {
                // Set the source
                toolTagCameraSource.setCamera(0);
            });

            toolTagCameraSource.onframeready = function(imageData) {
                this.onframeready(imageData);
            }.bind(this);

            document.addEventListener("visibilitychange", function() {
                toolTagCameraSource.stop();
            });

        };
        var ToolTagCameraSource = function (videoElement) {

            var stream;
            var animationFrameId;
            var self = this;
            var cameras = [];

            var gUM = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia || null);

            this.stop = function() {
                if(stream) {
                    stream.getTracks().forEach(function(t) { t.stop(); } );
                }
            };

            this.getDimensions = function() {
                return {
                    width: videoElement.videoWidth,
                    height: videoElement.videoHeight,
                    shouldLayout: true
                };
            };

            this.getCameras = function(cb) {
                cb = cb || function() {};

                if("enumerateDevices" in navigator.mediaDevices) {
                    navigator.mediaDevices.enumerateDevices()
                        .then(function(sources) {
                            sources.forEach(function(source) {
                                if(source.label.indexOf("facing back") >= 0) {
                                    // move front facing to the front.
                                    cameras.unshift(source);
                                }
                                else {
                                    cameras.push(source);
                                }
                            });

                            cb(cameras);

                            return cameras;
                        })
                        .catch(function(error) {
                            console.error("Enumeration Error", error);
                        });
                }
                else if("getSources" in MediaStreamTrack) {
                    MediaStreamTrack.getSources(function(sources) {
                        source.forEach(function (source) {
                            if(source.kind === "video") {
                                if(source.facing === "environment") {
                                    // cameras facing the environment are pushed to the front of the page
                                    cameras.unshift(source);
                                }
                                else {
                                    cameras.push(source);
                                }
                            }
                        });
                        cb(cameras);
                    });
                }
                else {
                    // We can't pick the correct camera because the API doesn't support it.
                    cb(cameras);
                }
            };

            this.setCamera = function(idx) {
                var videoSource = cameras[idx];
                var params;

                //Cancel any pending frame analysis
                cancelAnimationFrame(animationFrameId);

                if(videoSource === undefined && cameras.length == 0) {
                    // Because we have no source information, have to assume it user facing.
                    params = { audio: false, video: true};
                }
                else {
                    params = { audio: false, video: { facingMode: { exact: "environment" } }};
                }

                gUM.call(navigator, params, function(cameraStream) {
                    stream = cameraStream;
                    window.stream = cameraStream;
                    videoElement.addEventListener("loadeddata", function() {
                        var onframe = function() {
                            if(videoElement.videoWidth > 0)
                                self.onframeready(videoElement);
                            animationFrameId = requestAnimationFrame(onframe);
                        };

                        animationFrameId = requestAnimationFrame(onframe);
                    });


                    videoElement.srcObject = stream;
                    videoElement.load();
                    videoElement.play()
                        .catch(function(error) {
                            console.error("Auto Play Error", error);
                        });
                },errorCallback);

                function errorCallback(error) {
                    if(error.name == "NotAllowedError"){
                        $state.go("qr-result");
                        $state.get("qr-result").data = "Camera access denied! Please rescan to try again.";
                    }
                    console.log("navigator.getUserMedia error: ", error);
                }
            };

        }
        var ToolTagCameraManager = function (element) {

            var self = this;

            var gUM = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia || null);

            var root = document.getElementById(element);
            var cameraRoot;

            var root = document.getElementById(element);
            cameraRoot = root.querySelector(".CameraRealtime");

            if(gUM === null){
                console.log("Camera not found for web@work")
            }else{
                var toolTagWebCamManager = new ToolTagWebCamManager(cameraRoot)
            }

            cameraRoot.classList.remove("hidden");

            var cameraCanvas = root.querySelector(".Camera-display");
            var cameraOverlay = root.querySelector(".Camera-overlay");
            var context = cameraCanvas.getContext("2d");

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

            toolTagWebCamManager.onframeready = function (frameData) {

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
                var sourceDimensions = toolTagWebCamManager.getDimensions();

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

            window.addEventListener("resize", function() {
                coordinatesHaveChanged = true;
                setupVariables();
            }.bind(this));
        };

        toolTagQRCodeInit();

        var timeOut =   $timeout(function () {
            $state.go("qr-result");
            $state.get("qr-result").data = "Scan timed out! Please rescan to try again.";
        },15000);

        $state.params = timeOut;
    }]);
