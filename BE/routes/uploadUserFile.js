const {
  FILE_META_DATA_REPOSITORY,
  HASH_REPOSITORY,
} = require("./repositories");
const UTILS = require("./utils");
const { S3_HELPER, REKOGNITION_HELPER } = require("./helpers");
const { parse } = require("aws-multipart-parser");
module.exports.uploadUserFile = async (event) => {
  let RESPONSE;
  const USER_ID = event.pathParameters.userId;
  try {
    const FORM_DATA = parse(event, true);
    const FILE = FORM_DATA.file;
    console.log("FORM_DATA", FORM_DATA);
    //Insert Hash record
    const HASH = await UTILS.GET_HASH(FILE.content);
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
    const IMAGE_LABELS = await REKOGNITION_HELPER.GET_LABELS(
      USER_ID,
      FILE.filename
    );
    console.log("Labels for image", IMAGE_LABELS);
    //Create record in dynamo
    const INSERT_RECORD_RESULT = await FILE_META_DATA_REPOSITORY.INSERT_RECORD(
      USER_ID,
      FILE.filename,
      IMAGE_LABELS
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
