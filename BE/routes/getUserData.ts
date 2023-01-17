import { APIGatewayEvent } from "aws-lambda";
import { GENERIC_SUCCESS, UNAUTHORIZED } from "../config";
import { decryptJwtAsync } from "../helpers";
import { createResponseAsync } from "../utils";

export const getUserDataAsync = async (event: APIGatewayEvent) => {
  const AUTH_TOKEN = event.headers.Authorization;
  const RESULT = await decryptJwtAsync(AUTH_TOKEN);
  if (RESULT == null) {
    return await createResponseAsync(
      {},
      UNAUTHORIZED,
      "Either no auth token found or cognito config not found"
    );
  }
  return await createResponseAsync(RESULT, GENERIC_SUCCESS);
};
