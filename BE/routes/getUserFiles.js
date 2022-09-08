const { FILE_META_DATA_REPOSITORY } = require("./repositories");
const UTILS = require("./utils");
module.exports.getUserFiles = async (event) => {
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
