angular.module('scanToolTagComponentsModule')
    .service('cameraSourceService',[function () {

        this.getCamerasource = function (videoElement) {
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

            this.start = function () {
                var cameraIdx = 0;
                this.setCamera(cameraIdx)
            }

            this.getDimensions = function() {
                return {
                    width: videoElement.videoWidth,
                    height: videoElement.videoHeight,
                    shouldLayout: true
                };
            };

            this.getCameras = function(cb) {
                cb = cb || function() {};

                if('enumerateDevices' in navigator.mediaDevices) {
                    navigator.mediaDevices.enumerateDevices()
                        .then(function(sources) {
                            return sources.filter(function(source) {
                                return source.kind == 'videoinput'
                            });
                        })
                        .then(function(sources) {
                            sources.forEach(function(source) {
                                if(source.label.indexOf('facing back') >= 0) {
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
                else if('getSources' in MediaStreamTrack) {
                    MediaStreamTrack.getSources(function(sources) {
                        for(var i = 0; i < sources.length; i++) {
                            var source = sources[i];
                            if(source.kind === 'video') {
                                if(source.facing === 'environment') {
                                    // cameras facing the environment are pushed to the front of the page
                                    cameras.unshift(source);
                                }
                                else {
                                    cameras.push(source);
                                }
                            }
                        }
                        cb(cameras);
                    });
                }
                else {
                    // We can't pick the correct camera because the API doesn't support it.
                    cb(cameras);
                }
            };

            this.setCamera = function(idx) {
                this.videoSource = cameras[idx];
                var params;

                //Cancel any pending frame analysis
                cancelAnimationFrame(this.animationFrameId);

                if(this.videoSource === undefined && this.cameras.length == 0) {
                    // Because we have no source information, have to assume it user facing.
                    params = { audio: false, video: true};
                }
                else {
                    params = { audio: false, video: { facingMode: { exact: "environment" } }};
                }

                gUM.call(navigator, params, function(cameraStream) {
                    stream = cameraStream;
                    window.stream = cameraStream;
                    videoElement.addEventListener('loadeddata', function(e) {
                        console.log("Load")
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
                    if(error.name == 'NotAllowedError'){
                        $state.go('qr-result');
                        $state.get('qr-result').data = 'Camera access denied! Please rescan to try again.';
                    }
                    console.log('navigator.getUserMedia error: ', error);
                }
            };
        }
    }]);