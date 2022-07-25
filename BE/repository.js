const {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const S3_HELPER = require("./s3Helper");

const CLIENT = new DynamoDBClient({});
const TABLE_NAME = process.env.DYNAMO_DB_TABLE_NAME;

const GET_RECORD = async (userId) => {
  const PARAMS = {
    TableName: TABLE_NAME,
    Key: marshall({ userId: userId }),
  };
  const { Item } = await CLIENT.send(new GetItemCommand(PARAMS));
  const RESULT = Item ? unmarshall(Item) : {};
  return RESULT;
};

const INSERT_RECORD = async (userId, fileName, fileMetaData) => {
  const EXISTING_FILES = await GET_RECORD(userId);
  console.log(EXISTING_FILES);
  const FILES = [...EXISTING_FILES];
  FILES.push({
    fileName: fileName,
    fileMetaData: fileMetaData,
    s3Url: await S3_HELPER.GET_S3_URL_FOR_FILE(userId, fileName),
  });
  const PARAMS = {
    TableName: TABLE_NAME,
    Item: marshall({
      userId: userId,
      files: FILES,
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
