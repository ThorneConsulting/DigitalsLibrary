const {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const CLIENT = new DynamoDBClient({});
const TABLE_NAME = process.env.DYNAMO_DB_HASH_TABLE_NAME;

export const GET_FILE_HASH_RECORD = async (userFileHash: string) => {
  const PARAMS = {
    TableName: TABLE_NAME,
    Key: marshall({ userFileHash: userFileHash }),
  };
  const { Item } = await CLIENT.send(new GetItemCommand(PARAMS));
  const RESULT = Item ? unmarshall(Item) : {};
  return RESULT;
};

export const INSERT_FILE_HASH_RECORD = async (
  userFileHash: string,
  userId: string
) => {
  const USER_FILE_HASH_RECORD = await GET_FILE_HASH_RECORD(userFileHash);
  console.log(USER_FILE_HASH_RECORD);
  if (USER_FILE_HASH_RECORD?.userFileHash === userFileHash) {
    throw new Error("Duplicate file being uploaded cannot insert file record");
  }
  const PARAMS = {
    TableName: TABLE_NAME,
    Item: marshall({
      userFileHash: userFileHash,
      userId: userId,
    }),
  };

  const { Attributes } = await CLIENT.send(new PutItemCommand(PARAMS));
  const RESULT = Attributes ? unmarshall(Attributes) : {};
  return RESULT;
};
