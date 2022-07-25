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

module.exports = {
  CREATE_RESPONSE: CREATE_RESPONSE,
};
