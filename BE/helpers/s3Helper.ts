import {
  S3Client,
  CreateBucketCommand,
  HeadBucketCommand,
  CreateBucketCommandInput,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
const CLIENT = new S3Client({});

export const UPLOAD_FILE = async (
  bucketName: string,
  fileName: string,
  fileContent: Buffer | string
) => {
  const UPLOAD = new Upload({
    client: CLIENT,
    params: {
      Bucket: bucketName,
      Key: fileName,
      Body: fileContent,
    },
  });
  UPLOAD.on("httpUploadProgress", (progress) => {
    console.log(progress);
  });
  return await UPLOAD.done();
};

export const CREATE_BUCKET_IF_NOT_EXISTS = async (bucketName: string) => {
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

export const GET_S3_URL_FOR_FILE = async (
  bucketName: string,
  fileName: string
) => {
  return `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/${fileName}`;
};
