import { ApiResponse } from "./models";

export const CREATE_RESPONSE = async (
  data: any,
  message: string,
  statusCode: number
) => {
  const RESPONSE = {
    statusCode: statusCode,
    body: {
      data: data,
      message: message,
    },
  } as ApiResponse;
  return JSON.stringify(RESPONSE);
};

export const GET_HASH = async (data: string | Buffer) => {
  const CRYPTO = require("crypto");
  const HASH_SUM = CRYPTO.createHash("sha256");
  HASH_SUM.update(data);
  const HEX_VALUE = HASH_SUM.digest("hex");
  return HEX_VALUE;
};
