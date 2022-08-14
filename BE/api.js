const {
  FILE_META_DATA_REPOSITORY,
  HASH_REPOSITORY,
} = require("./repositories");
const UTILS = require("./utils");
const { S3_HELPER, REKOGNITION_HELPER } = require("./helpers");
const { parse } = require("aws-multipart-parser");

const getUserFiles = async (event) => {
  let RESPONSE;
  try {
    const USER_ID = event.pathParameters.userId;

    const RESULT = await FILE_META_DATA_REPOSITORY.GET_RECORD(USER_ID);

    console.log("Found Item", RESULT);

    RESPONSE = await UTILS.CREATE_RESPONSE(RESULT, "SUCCESS", 200);
  } catch (error) {
    console.error("Failed to get record");

    console.error(error);

    const ERROR = {
      errorMessage: error.message,
      errorStack: error.stack,
    };

    RESPONSE = await UTILS.CREATE_RESPONSE(ERROR, "ERROR", 500);
  }

  return RESPONSE;
};

const uploadUserFile = async (event) => {
  let RESPONSE;
  const USER_ID = event.pathParameters.userId;
  try {
    const FORM_DATA = parse(event, true);
    const FILE = FORM_DATA.file;
    console.log("FORM_DATA", FORM_DATA);
    //Insert Hash record
    const HASH = UTILS.GET_HASH(FILE.content);
    const INSERT_HASH_RECORD_RESULT = await HASH_REPOSITORY.INSERT_RECORD(
      HASH,
      USER_ID
    );
    //Upload file to S3
    const S3_UPLOAD_RESULT = await S3_HELPER.UPLOAD_FILE(
      USER_ID,
      FILE.filename,
      FILE.content
    );
    const REKOGNITION_RESULT = await REKOGNITION_HELPER.GET_LABELS(
      USER_ID,
      FILE.filename
    );
    console.log("Labels for image", REKOGNITION_RESULT);
    //Create record in dynamo
    const INSERT_RECORD_RESULT = await FILE_META_DATA_REPOSITORY.INSERT_RECORD(
      USER_ID,
      FILE.filename,
      REKOGNITION_RESULT
    );
    console.log("Created Item", INSERT_RECORD_RESULT);
    RESPONSE = await UTILS.CREATE_RESPONSE(
      INSERT_RECORD_RESULT,
      "SUCCESS",
      200
    );
  } catch (error) {
    console.error("Failed to get record");
    console.error(error);
    const ERROR = {
      errorMessage: error.message,
      errorStack: error.stack,
    };

    RESPONSE = await UTILS.CREATE_RESPONSE(ERROR, "ERROR", 500);
  }

  return RESPONSE;
};

const createUserBucketIfNotExist = async (event) => {
  const USER_ID = event.pathParameters.userId;
  let RESPONSE;
  try {
    const RESULT = await S3_HELPER.CREATE_BUCKET_IF_NOT_EXISTS(USER_ID);
    switch (RESULT) {
      case 200:
        RESPONSE = await UTILS.CREATE_RESPONSE(
          {},
          "Bucket created successfully",
          201
        );
        break;
      case 403:
        RESPONSE = await UTILS.CREATE_RESPONSE(
          {},
          "You are not authorized to access this resource",
          403
        );
        break;
      default:
        RESPONSE = await UTILS.CREATE_RESPONSE(
          {},
          "The request that was sent was malformed",
          400
        );
    }
  } catch (error) {
    console.error("ERROR", error);
    console.error(error);
    const ERROR = {
      errorMessage: error.message,
      errorStack: error.stack,
    };

    RESPONSE = await UTILS.CREATE_RESPONSE(ERROR, "ERROR", 500);
  }
  return RESPONSE;
};

module.exports = {
  getUserFiles,
  uploadUserFile,
  createUserBucketIfNotExist,
};
