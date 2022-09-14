import { CREATE_RESPONSE } from "../utils";
import { CREATE_BUCKET_IF_NOT_EXISTS } from "../helpers";
import { APIGatewayEvent } from "aws-lambda";
export const createUserBucketIfNotExist = async (event: APIGatewayEvent) => {
  const USER_ID = event.pathParameters?.userId;
  if (USER_ID == undefined) {
    return await CREATE_RESPONSE({}, "Invalid UserId", 400);
  }
  let RESPONSE;
  try {
    const RESULT = await CREATE_BUCKET_IF_NOT_EXISTS(USER_ID);
    switch (RESULT) {
      case 200:
        RESPONSE = await CREATE_RESPONSE(
          {},
          "Bucket created successfully",
          201
        );
        break;
      case 403:
        RESPONSE = await CREATE_RESPONSE(
          {},
          "You are not authorized to access this resource",
          403
        );
        break;
      default:
        RESPONSE = await CREATE_RESPONSE(
          {},
          "The request that was sent was malformed",
          400
        );
    }
  } catch (error: any) {
    console.error("ERROR", error);
    console.error(error);
    const ERROR = {
      errorMessage: error.message,
      errorStack: error.stack,
    };

    RESPONSE = await CREATE_RESPONSE(ERROR, "ERROR", 500);
  }
  return RESPONSE;
};
