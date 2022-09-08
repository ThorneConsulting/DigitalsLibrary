const UTILS = require("./utils");
const { S3_HELPER } = require("./helpers");
module.exports.createUserBucketIfNotExist = async (event) => {
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
