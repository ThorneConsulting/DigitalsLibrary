import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { getS3UrlForFileAsync } from "../helpers";
import { DynamoRecord } from "../models";
const CLIENT = new DynamoDBClient({});
const TABLE_NAME = process.env.DYNAMO_DB_FILE_META_DATA_TABLE_NAME;

export const getUserFileRecordAsync = async (userId: string) => {
  const PARAMS = {
    TableName: TABLE_NAME,
    Key: marshall({ userId: userId }),
  };
  const { Item } = await CLIENT.send(new GetItemCommand(PARAMS));
  const RESULT = Item ? unmarshall(Item) : {};
  return RESULT;
};

export const insertUserFileRecordAsync = async (
  userId: string,
  fileName: string,
  tags: (string | undefined)[] | undefined
) => {
  const USER_RECORD = await getUserFileRecordAsync(userId);
  console.log(JSON.stringify(USER_RECORD));
  let EXISTING_FILES: DynamoRecord[] = [];
  if (Array.isArray(USER_RECORD.files)) {
    EXISTING_FILES = USER_RECORD.files;
  } else {
    if (USER_RECORD?.files !== undefined) {
      EXISTING_FILES = [
        {
          fileName: USER_RECORD.files.fileName,
          tags: USER_RECORD.files.tags,
          s3Url: USER_RECORD.files.s3Url,
        } as DynamoRecord,
      ];
    }
  }
  console.log(...EXISTING_FILES);
  const FILES = [...EXISTING_FILES];
  const doesFileAlreadyExist =
    FILES.filter((file) => file.fileName === fileName).length > 0;
  console.log("Already Existing", doesFileAlreadyExist);
  console.log(...FILES.filter((file) => file.fileName === fileName));
  console.log("File name", fileName);
  if (!doesFileAlreadyExist) {
    FILES.push({
      fileName: fileName,
      tags: tags,
      s3Url: await getS3UrlForFileAsync(userId, fileName),
    });
    const PARAMS = {
      TableName: TABLE_NAME,
      Item: marshall({
        userId: userId,
        files: FILES,
      }),
    };

    const { Attributes } = await CLIENT.send(new PutItemCommand(PARAMS));

    const RESULT = Attributes ? unmarshall(Attributes) : {};
    return RESULT;
  } else {
    const RESULT = await getUserFileRecordAsync(userId);
    return RESULT;
  }
};
