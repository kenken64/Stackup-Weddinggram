var config = require('../../config'),
    crypto = require('crypto');

const EXPIRY_IN_MINUTES = 5;

var getExpiryTime = function () {
    var date = new Date();
    date.setMinutes(date.getMinutes() + EXPIRY_IN_MINUTES);
    return date.toISOString();
};

var signPolicy = function (base64Policy) {
    return crypto
        .createHmac('sha1', config.aws.key)
        .update(new Buffer(base64Policy, 'utf-8'))
        .digest('base64');
};

var getS3Policy = function (contentType) {
    return {
        'expiration': getExpiryTime(),
        'conditions': [
            {'bucket': config.aws.bucket},
            {'acl': 'public-read'},
            ['starts-with', '$key', ""],
            ["starts-with", "$Content-Type", ""],
            ["starts-with", "$filename", ""],
            ["content-length-range", 0, 524288000]
        ]
    };
};

var createS3Policy = function (contentType) {
    var s3Policy = getS3Policy(contentType);
    var stringPolicy = JSON.stringify(s3Policy);
    var base64Policy = new Buffer(stringPolicy, 'utf-8').toString('base64');
    var signature = signPolicy(base64Policy);
    console.log(config.aws.url);
    return {
        s3Policy: base64Policy,
        s3Signature: signature,
        AWSAccessKeyId: config.aws.id,
        bucketUrl: config.aws.url
    };
};

exports.getSignedPolicy = function (req, res) {
    var signedPolicy = createS3Policy(req.body.mimeType);
    console.log(signedPolicy);
    res
        .status(200)
        .json(signedPolicy);
};