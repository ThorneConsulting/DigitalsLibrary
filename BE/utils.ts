import { APIGatewayEvent } from "aws-lambda";
import { BAD_REQUEST, GENERIC_SUCCESS, UNAUTHORIZED } from "./config";
import { verifyValidUserIdAsync } from "./helpers";
import { ApiResponse } from "./models";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
export const createResponseAsync = async (
  data: any,
  responseObject: ApiResponse,
  customMessage?: string,
  headers?: Object
) => {
  let RESPONSE;
  if (customMessage === undefined) {
    RESPONSE = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      statusCode: responseObject.statusCode,
      body: JSON.stringify({
        data: data,
        message: responseObject.message,
      }),
    };
    if (headers) {
      RESPONSE = {
        ...RESPONSE,
        ...headers,
      };
    }
  } else {
    RESPONSE = {
      statusCode: responseObject.statusCode,
      body: JSON.stringify({
        data: data,
        message: customMessage,
      }),
    };
  }
  return RESPONSE;
};

export const getHashAsync = async (data: string) => {
  const HEX_VALUE = Base64.stringify(sha256(data));
  console.log("HEX_VALUE", HEX_VALUE);
  return HEX_VALUE;
};

export const applyCommonValidationsAsync = async (event: APIGatewayEvent) => {
  if (event.headers.Authorization === undefined) {
    return await createResponseAsync({}, UNAUTHORIZED);
  }

  const AUTH_TOKEN = event.headers.Authorization;
  const USER_ID = event.pathParameters?.userId;
  const IS_VALID_USERID = await verifyValidUserIdAsync(AUTH_TOKEN, USER_ID);
  return IS_VALID_USERID
    ? await createResponseAsync({}, GENERIC_SUCCESS)
    : await createResponseAsync(
        {},
        BAD_REQUEST,
        "User Id doesnt match the authurization"
      );
};
