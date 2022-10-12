import { APIGatewayEvent } from "aws-lambda";
import { GENERIC_SUCCESS, UNAUTHORIZED } from "../config";
import { decryptJwt } from "../helpers";
import { createResponseAsync } from "../utils";

export const getUserDataAsync = async (event: APIGatewayEvent) => {
  const AUTH_TOKEN = event.headers.Authorization;
  console.log("AUTH_TOKEN", AUTH_TOKEN);
  const RESULT = decryptJwt(AUTH_TOKEN);
  console.log("RESULT", RESULT);
  if (RESULT == null) {
    return await createResponseAsync(
      {},
      UNAUTHORIZED,
      "Either no auth token found or cognito config not found"
    );
  }
  return await createResponseAsync(RESULT, GENERIC_SUCCESS);
};
