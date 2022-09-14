import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { GET_S3_URL_FOR_FILE } from "../helpers";
import { DynamoRecord } from "../models";
const CLIENT = new DynamoDBClient({});
const TABLE_NAME = process.env.DYNAMO_DB_FILE_META_DATA_TABLE_NAME;

export const GET_USER_FILE_RECORD = async (userId: string) => {
  const PARAMS = {
    TableName: TABLE_NAME,
    Key: marshall({ userId: userId }),
  };
  const { Item } = await CLIENT.send(new GetItemCommand(PARAMS));
  const RESULT = Item ? unmarshall(Item) : {};
  return RESULT;
};

export const INSERT_USER_FILE_RECORD = async (
  userId: string,
  fileName: string,
  tags: (string | undefined)[] | undefined
) => {
  const USER_RECORD = await GET_USER_FILE_RECORD(userId);
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
  const FILES = [...EXISTING_FILES];
  FILES.push({
    fileName: fileName,
    tags: tags,
    s3Url: await GET_S3_URL_FOR_FILE(userId, fileName),
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
};
