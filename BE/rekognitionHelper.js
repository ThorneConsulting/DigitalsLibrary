const {
  RekognitionClient,
  DetectLabelsCommand,
} = require("@aws-sdk/client-rekognition");
const CLIENT = new RekognitionClient({ region: "ap-southeast-2" });

const GET_LABELS = async (bucketName, fileName) => {
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
  return Labels;
};

module.exports = {
  GET_LABELS: GET_LABELS,
};
