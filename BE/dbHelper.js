const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const CLIENT = new DynamoDBClient({});
module.exports = CLIENT;
