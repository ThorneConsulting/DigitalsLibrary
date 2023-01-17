import {
  insertFileHashRecordAsync,
  insertUserFileRecordAsync,
} from "../repositories";
import {
  applyCommonValidationsAsync,
  createResponseAsync,
  getHashAsync,
} from "../utils";
import { uploadFileAsync, getLabelsAsync } from "../helpers";
import { parse } from "aws-multipart-parser";
import { FileData } from "aws-multipart-parser/dist/models";
import { APIGatewayEvent } from "aws-lambda";
import { BAD_REQUEST, GENERIC_ERROR, GENERIC_SUCCESS } from "../config";
export const uploadUserFileAsync = async (event: APIGatewayEvent) => {
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
    const FORM_DATA = parse(event, true);
    const FILE = FORM_DATA.file as FileData;
    const fileBuffer = Buffer.from(FILE.content);
    console.log("BUFFER", fileBuffer);
    //Insert Hash record
    const HASH = await getHashAsync(fileBuffer);
    const INSERT_HASH_RECORD_RESULT = await insertFileHashRecordAsync(
      HASH,
      USER_ID
    );
    //Upload file to S3
    const S3_UPLOAD_RESULT = await uploadFileAsync(
      USER_ID,
      FILE.filename,
      FILE.content
    );
    const IMAGE_LABELS = await getLabelsAsync(USER_ID, FILE.filename);
    //Create record in dynamo
    const INSERT_RECORD_RESULT = await insertUserFileRecordAsync(
      USER_ID,
      FILE.filename,
      IMAGE_LABELS
    );
    RESPONSE = await createResponseAsync(INSERT_RECORD_RESULT, GENERIC_SUCCESS);
  } catch (error: any) {
    console.error("Failed to get record");
    console.error(error);
    const ERROR = {
      errorMessage: error.message,
      errorStack: error.stack,
    };

    RESPONSE = await createResponseAsync(ERROR, GENERIC_ERROR);
  }

  return RESPONSE;
};
