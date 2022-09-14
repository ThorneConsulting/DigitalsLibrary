import {
  RekognitionClient,
  DetectLabelsCommand,
} from "@aws-sdk/client-rekognition";
const CLIENT = new RekognitionClient({ region: "ap-southeast-2" });

export const GET_LABELS = async (bucketName: string, fileName: string) => {
  const { Labels } = await CLIENT.send(
    new DetectLabelsCommand({
      Image: {
        S3Object: {
          Bucket: bucketName,
          Name: fileName,
        },
      },
      MaxLabels: 10,
      MinConfidence: 60,
    })
  );
  const labelNames = Labels?.map((label) => label.Name);
  return labelNames;
};
