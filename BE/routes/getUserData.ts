import { APIGatewayEvent } from "aws-lambda";
import { GENERIC_SUCCESS, UNAUTHORIZED } from "../config";
import { decryptJwt } from "../helpers";
import { createResponseAsync } from "../utils";

export const getUserDataAsync = async (event: APIGatewayEvent) => {
  const AUTH_TOKEN = event.headers.Authorization;
  const RESULT = decryptJwt(AUTH_TOKEN);
  if (RESULT == null) {
    createResponseAsync(
      {},
      UNAUTHORIZED,
      "Either no auth token found or cognito config not found"
    );
  }
  createResponseAsync(RESULT, GENERIC_SUCCESS);
};
