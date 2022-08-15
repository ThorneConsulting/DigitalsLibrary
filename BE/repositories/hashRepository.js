const {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const CLIENT = new DynamoDBClient({});
const TABLE_NAME = process.env.DYNAMO_DB_HASH_TABLE_NAME;

const GET_RECORD = async (userFileHash) => {
  const PARAMS = {
    TableName: TABLE_NAME,
    Key: marshall({ userFileHash: userFileHash }),
  };
  const { Item } = await CLIENT.send(new GetItemCommand(PARAMS));
  const RESULT = Item ? unmarshall(Item) : {};
  return RESULT;
};

const INSERT_RECORD = async (userFileHash, userId) => {
  const USER_FILE_HASH_RECORD = await GET_RECORD(userFileHash);
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

  const { ItemCollectionMetrics } = await CLIENT.send(
    new PutItemCommand(PARAMS)
  );
  const RESULT = ItemCollectionMetrics ? unmarshall(ItemCollectionMetrics) : {};
  return RESULT;
};

module.exports = {
  GET_RECORD: GET_RECORD,
  INSERT_RECORD: INSERT_RECORD,
};
