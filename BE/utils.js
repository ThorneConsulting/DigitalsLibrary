const CREATE_RESPONSE = async (data, message, statusCode) => {
  const RESPONSE = {
    statusCode: statusCode,
    body: JSON.stringify({
      data: data,
      message: message,
    }),
  };
  return RESPONSE;
};

const GET_HASH = async (data) => {
  const CRYPTO = require("crypto");
  const HASH_SUM = CRYPTO.createHash("sha256");
  HASH_SUM.update(data);
  const HEX_VALUE = HASH_SUM.digest("hex");
  return HEX_VALUE;
};

module.exports = {
  CREATE_RESPONSE: CREATE_RESPONSE,
  GET_HASH: GET_HASH,
};
