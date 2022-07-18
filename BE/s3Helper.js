const { S3Client } = require("@aws-sdk/client-s3");
const CLIENT = new S3Client();
module.exports = CLIENT;
