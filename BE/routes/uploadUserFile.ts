import {
  insertFileHashRecordAsync,
  insertUserFileRecordAsync,
} from "../repositories";
import { applyCommonValidationsAsync, createResponseAsync } from "../utils";
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
    const HASH_VALUE = event.body as string;
    console.log(JSON.parse(event.body));
    if (HASH_VALUE === undefined) {
      console.log(event.body);
      throw new Error(`Cant get hash from headers ${FORM_DATA}`);
    }
    const INSERT_HASH_RECORD_RESULT = await insertFileHashRecordAsync(
      HASH_VALUE,
      USER_ID
    );

    const FILE = FORM_DATA.file as FileData;
    //Upload file to S3
    const S3_UPLOAD_RESULT = await uploadFileAsync(
      USER_ID,
      FILE.filename,
      FILE.content
    );
    if (S3_UPLOAD_RESULT === undefined) {
      throw new Error("Something went wrong with uploading object");
    }
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
