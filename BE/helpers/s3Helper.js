const {
  S3Client,
  CreateBucketCommand,
  HeadBucketCommand,
} = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const UTILS = require("./utils");
const CLIENT = new S3Client();

const UPLOAD_FILE = async (bucketName, fileName, fileContent) => {
  const UPLOAD = new Upload({
    client: CLIENT,
    params: {
      Bucket: bucketName,
      Key: fileName,
      Body: fileContent,
    },
  });
  UPLOAD.on("httpUploadProgress", (progress) => {
    console.log(progress);
  });
  return await UPLOAD.done();
};

const CREATE_BUCKET_IF_NOT_EXISTS = async (bucketName) => {
  let DOES_BUCKET_EXISTS;
  try {
    const RESULT = await CLIENT.send(
      new HeadBucketCommand({ Bucket: bucketName })
    );
    DOES_BUCKET_EXISTS = RESULT.$metadata;
    console.log("Found the bucket", DOES_BUCKET_EXISTS);
  } catch (error) {
    console.error("ERROR", error);
    DOES_BUCKET_EXISTS = error.$metadata;
  } finally {
    if (DOES_BUCKET_EXISTS.httpStatusCode == 404) {
      const CREATE_BUCKET_RESULT = await S3_HELPER.send(
        new CreateBucketCommand({
          Bucket: USER_ID,
          CreateBucketConfiguration: { LocationConstraint: "ap-southeast-2" },
          ServerSideEncryption: "AES256",
        })
      );

      if (CREATE_BUCKET_RESULT.$metadata.httpStatusCode == 200) {
        return CREATE_BUCKET_RESULT.$metadata.httpStatusCode;
      }
      console.log("CREATED", CREATE_BUCKET_RESULT);
    }

    return DOES_BUCKET_EXISTS.httpStatusCode;
  }
};

const GET_S3_URL_FOR_FILE = async (bucketName, fileName) => {
  return `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/${fileName}`;
};
module.exports = {
  UPLOAD_FILE: UPLOAD_FILE,
  CREATE_BUCKET_IF_NOT_EXISTS: CREATE_BUCKET_IF_NOT_EXISTS,
  GET_S3_URL_FOR_FILE: GET_S3_URL_FOR_FILE,
};
