import {
  S3Client,
  CreateBucketCommand,
  HeadBucketCommand,
  CreateBucketCommandInput,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
const CLIENT = new S3Client({});

export const uploadFileAsync = async (
  bucketName: string,
  fileName: string,
  fileContent: Buffer | string
) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
  });
  const RESULT = await CLIENT.send(command);

  return RESULT.ETag;
};

export const createBUcketIfNotExistsAsync = async (bucketName: string) => {
  let DOES_BUCKET_EXISTS;
  try {
    const RESULT = await CLIENT.send(
      new HeadBucketCommand({ Bucket: bucketName })
    );
    DOES_BUCKET_EXISTS = RESULT.$metadata;
    console.log("Found the bucket", DOES_BUCKET_EXISTS);
  } catch (error: any) {
    console.error("ERROR", error);
    DOES_BUCKET_EXISTS = error.$metadata;
  } finally {
    if (DOES_BUCKET_EXISTS.httpStatusCode == 404) {
      const CREATE_BUCKET_RESULT = await CLIENT.send(
        new CreateBucketCommand({
          Bucket: bucketName,
          CreateBucketConfiguration: { LocationConstraint: "ap-southeast-2" },
          ServerSideEncryption: "AES256",
        } as CreateBucketCommandInput)
      );

      if (CREATE_BUCKET_RESULT.$metadata.httpStatusCode == 200) {
        return CREATE_BUCKET_RESULT.$metadata.httpStatusCode;
      }
      console.log("CREATED", CREATE_BUCKET_RESULT);
    }

    return DOES_BUCKET_EXISTS.httpStatusCode;
  }
};

export const getS3UrlForFileAsync = async (
  bucketName: string,
  fileName: string
) => {
  return `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/${fileName}`;
};
