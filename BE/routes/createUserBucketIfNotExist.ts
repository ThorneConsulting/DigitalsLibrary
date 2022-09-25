import { applyCommonValidationsAsync, createResponseAsync } from "../utils";
import {
  createBUcketIfNotExistsAsync,
  verifyValidUserIdAsync,
} from "../helpers";
import { APIGatewayEvent } from "aws-lambda";
import {
  BAD_REQUEST,
  FORBIDDEN,
  GENERIC_ERROR,
  GENERIC_SUCCESS,
} from "../config";
export const createUserBucketIfNotExistAsync = async (
  event: APIGatewayEvent
) => {
  const VALIDATION_RESULT = await applyCommonValidationsAsync(event);
  if (VALIDATION_RESULT.statusCode !== 200) {
    return VALIDATION_RESULT;
  }
  const USER_ID = event.pathParameters?.userId;

  if (USER_ID == undefined) {
    return await createResponseAsync({}, BAD_REQUEST, "Invalid UserId");
  }

  let RESPONSE;
  try {
    const RESULT = await createBUcketIfNotExistsAsync(USER_ID);
    switch (RESULT) {
      case 200:
        RESPONSE = await createResponseAsync({}, GENERIC_SUCCESS);
        break;
      case 403:
        RESPONSE = await createResponseAsync({}, FORBIDDEN);
        break;
      default:
        RESPONSE = await createResponseAsync({}, BAD_REQUEST);
    }
  } catch (error: any) {
    console.error("ERROR", error);
    console.error(error);
    const ERROR = {
      errorMessage: error.message,
      errorStack: error.stack,
    };

    RESPONSE = await createResponseAsync(ERROR, GENERIC_ERROR);
  }
  return RESPONSE;
};
