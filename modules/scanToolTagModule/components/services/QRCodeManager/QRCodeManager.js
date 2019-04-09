angular.module('scanToolTagComponentsModule')
    .service('QRCodeManagerService',function () {

        var client = new QRClient();

        this.getQRCode = function () {
            this.detectQRCode = function(context, callback) {
                callback = callback || function() {};
                client.decode(context, function(result) {
                    callback(result);
                });
            };

        }
    });