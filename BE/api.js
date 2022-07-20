const DB_HELPER = require("./dbHelper");
const S3_HELPER = require("./s3Helper");
const { parser } = require("aws-multipart-parser");
const {
  CreateBucketCommand,
  HeadBucketCommand,
} = require("@aws-sdk/client-s3");
const { GetItemCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const { Upload } = require("@aws-sdk/lib-storage");

const getUserFiles = async (event) => {
  const response = { statusCode: 200 };

  try {
    const PARAMS = {
      TableName: process.env.DYNAMO_DB_TABLE_NAME,
      Key: marshall({ userId: event.pathParameters.userId }),
    };
    const { Item } = await DB_HELPER.send(new GetItemCommand(PARAMS));
    console.log("Found Item", Item);

    response.body = JSON.stringify({
      message: "Successfully retrived user files",
      data: Item ? unmarshall(Item) : {},
      rawData: Item,
    });
  } catch (error) {
    console.error("Failed to get record");
    console.error(error);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Failed to get record",
      errorMessage: error.message,
      errorStack: error.stack,
    });
  }

  return response;
};

const uploadUserFile = async (event) => {
  const response = { statusCode: 200 };
  const USER_ID = event.pathParameters.userId;
  try {
    const FORM_DATA = parser(event, true);
    const FILE = FORM_DATA.file;
    console.log("FORM_DATA", FORM_DATA);
    const upload = new Upload({
      client: S3_HELPER,
      params: {
        Bucket: USER_ID,
        Key: FORM_DATA.file.fileName,
        Body: FORM_DATA.file.content.data,
      },
    });
    upload.on("httpUploadProgress", (progress) => {
      console.log(progress);
    });
    await upload.done();
    //Create record in dynamo
    await createRecordInDynamo(USER_ID, FILE, response);
  } catch (error) {
    console.error("Failed to get record");
    console.error(error);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Failed to get record",
      errorMessage: error.message,
      errorStack: error.stack,
    });
  }

  return response;
};

const createUserBucketIfNotExist = async (event) => {
  const USER_ID = event.pathParameters.userId;
  var DOES_BUCKET_EXISTS;
  try {
    DOES_BUCKET_EXISTS = await S3_HELPER.send(
      new HeadBucketCommand({ Bucket: USER_ID })
    );
    console.log("RESPONSE", JSON.stringify(DOES_BUCKET_EXISTS));
  } catch (error) {
    console.error("ERROR", error);
    response.statusCode = DOES_BUCKET_EXISTS.$metadata.httpStatusCode;
    response.body = JSON.stringify({
      errorMessage: error.message,
      errorStack: error.stack,
    });
  } finally {
    // if (DOES_BUCKET_EXISTS.$metadata.httpStatusCode == 403) {
    //   response.statusCode = DOES_BUCKET_EXISTS.$metadata?.httpStatusCode;
    //   response.body = JSON.stringify({
    //     message: "You do not have access permission to view this resource",
    //     errorMessage: "Unauthorized",
    //     errorStack: {},
    //   });
    //   return response;
    // }
    console.log("RESPONSE", JSON.stringify(DOES_BUCKET_EXISTS));
    const CREATE_BUCKET_RESULT = await S3_HELPER.send(
      new CreateBucketCommand({
        Bucket: USER_ID,
        CreateBucketConfiguration: { LocationConstraint: "ap-southeast-2" },
        ServerSideEncryption: "AES256",
      })
    );

    const response = { statusCode: 201, messag: "Created", data: {} };
    return response;
  }
};
async function createRecordInDynamo(USER_ID, FILE, response) {
  const DYNAMO_DB_PARAMS = {
    TableName: process.env.DYNAMO_DB_TABLE_NAME,
    Item: marshall({
      userId: USER_ID,
      s3Url: `https://${USER_ID}.s3.ap-souteast-2.amazonaws.com/${FILE.fileName}`,
    }),
  };

  const createResult = await DB_HELPER.send(
    new PutItemCommand(DYNAMO_DB_PARAMS)
  );
  console.log("Created Item", Item);

  response.body = JSON.stringify({
    message: "Successfully created user files",
    data: unmarshall(createResult),
    rawData: createResult,
  });
}

module.exports = {
  getUserFiles,
  uploadUserFile,
  createUserBucketIfNotExist,
};
