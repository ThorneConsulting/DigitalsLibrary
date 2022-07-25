const {
  RekognitionClient,
  DetectLabelsCommand,
} = require("@aws-sdk/client-rekognition");
const CLIENT = new RekognitionClient({ region: "ap-southeast-2" });

const GET_LABELS = async (s3Url) => {
  const { Labels } = await CLIENT.send(
    new DetectLabelsCommand({ Image: s3Url })
  );
  return Labels;
};

module.exports = {
  GET_LABELS: GET_LABELS,
};
