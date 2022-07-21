const DB_HELPER = require("./dbHelper");
const S3_HELPER = require("./s3Helper");
const { parse } = require("aws-multipart-parser");
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
    const FORM_DATA = parse(event, true);
    const FILE = FORM_DATA.file;
    console.log("FORM_DATA", FORM_DATA);
    const upload = new Upload({
      client: S3_HELPER,
      params: {
        Bucket: USER_ID,
        Key: FORM_DATA.file.fileName,
        Body: FORM_DATA.file.content,
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
  let response = { statusCode: 200 };
  let DOES_BUCKET_EXISTS;
  try {
    await S3_HELPER.send(new HeadBucketCommand({ Bucket: USER_ID }));
  } catch (error) {
    console.error("ERROR", error);
    DOES_BUCKET_EXISTS = error.$metadata;
  } finally {
    if (DOES_BUCKET_EXISTS.httpStatusCode == 403) {
      response.statusCode = DOES_BUCKET_EXISTS.httpStatusCode;
      response.body = JSON.stringify({
        message: "You do not have access permission to view this resource",
        errorMessage: "Unauthorized",
        errorStack: DOES_BUCKET_EXISTS.errorStack,
      });
      return response;
    }

    if (DOES_BUCKET_EXISTS.httpStatusCode == 404) {
      const CREATE_BUCKET_RESULT = await S3_HELPER.send(
        new CreateBucketCommand({
          Bucket: USER_ID,
          CreateBucketConfiguration: { LocationConstraint: "ap-southeast-2" },
          ServerSideEncryption: "AES256",
        })
      );

      if (CREATE_BUCKET_RESULT.$metadata.httpStatusCode == 200) {
        response.statusCode = CREATE_BUCKET_RESULT.$metadata.httpStatusCode;
        response.body = JSON.stringify({
          message: "Bucket created successfully",
          data: {},
        });
      }
      console.log("CREATED", CREATE_BUCKET_RESULT);
    }
  }
  return response;
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
