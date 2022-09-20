import { APIGatewayEvent } from "aws-lambda";
import * as ROUTES from "./routes";
const getUserFiles = async (event: APIGatewayEvent) => {
  const RESULT = await ROUTES.getUserFiles(event);
  return RESULT;
};
module.exports = {
  getUserFiles,
  uploadUserFile: ROUTES.uploadUserFile,
  createUserBucketIfNotExist: ROUTES.createUserBucketIfNotExist,
};
