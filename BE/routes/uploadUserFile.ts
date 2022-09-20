import {
  INSERT_FILE_HASH_RECORD,
  INSERT_USER_FILE_RECORD,
} from "../repositories";
import { CREATE_RESPONSE, GET_HASH } from "../utils";
import { UPLOAD_FILE, GET_LABELS } from "../helpers";
import { parse } from "aws-multipart-parser";
import { FileData } from "aws-multipart-parser/dist/models";
import { APIGatewayEvent } from "aws-lambda";
export const uploadUserFile = async (event: APIGatewayEvent) => {
  const USER_ID = event.pathParameters?.userId;
  if (USER_ID == undefined) {
    return await CREATE_RESPONSE({}, "Invalid UserId", 400);
  }
  let RESPONSE;
  try {
    const FORM_DATA = parse(event, true);
    const FILE = FORM_DATA.file as FileData;
    console.log("FORM_DATA", FORM_DATA);
    //Insert Hash record
    const HASH = await GET_HASH(FILE.content);
    const INSERT_HASH_RECORD_RESULT = await INSERT_FILE_HASH_RECORD(
      HASH,
      USER_ID
    );
    //Upload file to S3
    const S3_UPLOAD_RESULT = await UPLOAD_FILE(
      USER_ID,
      FILE.filename,
      FILE.content
    );
    const IMAGE_LABELS = await GET_LABELS(USER_ID, FILE.filename);
    console.log("Labels for image", IMAGE_LABELS);
    //Create record in dynamo
    const INSERT_RECORD_RESULT = await INSERT_USER_FILE_RECORD(
      USER_ID,
      FILE.filename,
      IMAGE_LABELS
    );
    console.log("Created Item", INSERT_RECORD_RESULT);
    RESPONSE = await CREATE_RESPONSE(INSERT_RECORD_RESULT, "SUCCESS", 200);
  } catch (error: any) {
    console.error("Failed to get record");
    console.error(error);
    const ERROR = {
      errorMessage: error.message,
      errorStack: error.stack,
    };

    RESPONSE = await CREATE_RESPONSE(ERROR, "ERROR", 500);
  }

  return RESPONSE;
};
