(function () {
    angular
        .module("weddingGramApp")
        .controller("ImageUploadCtrl", [
            "Upload",
            "$http",
            UploadCtrl
        ]);

    function UploadCtrl(Upload, $http) {

        var self = this;
        self.form = {file: null};
        self.submit = function () {
            prepareUpload(function (url) {
                save(url);
            });
        };

        var save = function (url) {
            $http
                .post("/api/posts", {
                    url: url,
                    caption: self.form.caption
                })
                .then(function () {
                    self.showUpload = false;
                })
                .catch(function () {
                    alert("Oops some error occurred.");
                });
        };

        var prepareUpload = function (afterUpload) {
            $http
                .post("/api/aws/s3-policy", {
                    mimeType: self.form.file.type
                })
                .then(function (response) {
                    uploadFile(response.data, afterUpload);
                })
                .catch(function (response) {

                });
        };

        var uploadFile = function (fileUploadConfig, afterUpload) {

            console.log(fileUploadConfig.bucketUrl);
            Upload.upload({
                url: fileUploadConfig.bucketUrl,
                method: 'POST',
                data: {
                    key: Date.now() + "_" + self.form.file.name,
                    AWSAccessKeyId: fileUploadConfig.AWSAccessKeyId,
                    acl: "public-read",
                    policy: fileUploadConfig.s3Policy,
                    signature: fileUploadConfig.s3Signature,
                    "Content-Type": self.form.file.name,
                    filename: self.form.file.name,
                    file: self.form.file
                }
            }).then(function (resp) {
                afterUpload(resp.config.data.key);
            }, function (resp) {
                // Called when upload fails
            }, function (evt) {
                // Called as the upload progresses
            });
        };
    }
})();