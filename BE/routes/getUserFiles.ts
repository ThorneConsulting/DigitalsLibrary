import { APIGatewayEvent } from "aws-lambda";
import { BAD_REQUEST, GENERIC_ERROR, GENERIC_SUCCESS } from "../config";
import { getUserFileRecordAsync } from "../repositories";
import { applyCommonValidationsAsync, createResponseAsync } from "../utils";

export const getUserFilesAsync = async (event: APIGatewayEvent) => {
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
    const RESULT = await getUserFileRecordAsync(USER_ID);

    console.log("Found Item", RESULT);

    RESPONSE = await createResponseAsync(RESULT, GENERIC_SUCCESS);
  } catch (error: any) {
    console.error("Failed to get record");

    console.error(error);

    const ERROR = {
      errorMessage: error.message,
      errorStack: error.stack,
    };

    RESPONSE = await createResponseAsync(ERROR, GENERIC_ERROR);
  }
  console.log(RESPONSE);
  return RESPONSE;
};
