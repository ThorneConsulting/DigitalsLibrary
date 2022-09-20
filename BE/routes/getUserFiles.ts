import { APIGatewayEvent } from "aws-lambda";
import { GET_USER_FILE_RECORD } from "../repositories";
import { CREATE_RESPONSE } from "../utils";
export const getUserFiles = async (event: APIGatewayEvent) => {
  const USER_ID = event.pathParameters?.userId;
  if (USER_ID == undefined) {
    return await CREATE_RESPONSE({}, "Invalid UserId", 400);
  }
  let RESPONSE;
  try {
    const RESULT = await GET_USER_FILE_RECORD(USER_ID);

    console.log("Found Item", RESULT);

    RESPONSE = await CREATE_RESPONSE(RESULT, "SUCCESS", 200);
  } catch (error: any) {
    console.error("Failed to get record");

    console.error(error);

    const ERROR = {
      errorMessage: error.message,
      errorStack: error.stack,
    };

    RESPONSE = await CREATE_RESPONSE(ERROR, "ERROR", 500);
  }
  console.log(RESPONSE);
  return RESPONSE;
};
