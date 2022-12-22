import { ApiResponse } from "../models/apiResponseModel";
import { getToken } from "./tokenService";
const BASE_URL =
  "https://dxe7tgo401.execute-api.ap-southeast-2.amazonaws.com/dev";
const TOKEN = await getToken();
export const getUserData = async () => {
  const RESPONSE = await (
    await fetch(`${BASE_URL}/users/user-data`, {
      headers: {
        Authorization: TOKEN,
        "X-Amz-Date": new Date().toUTCString(),
      },
      method: "GET",
    })
  ).json();
  console.log(RESPONSE);
  return RESPONSE as ApiResponse;
};

export const createUserBucket = async (userId: string | undefined) => {
  if (userId === undefined) {
    throw new Error("UserId cannot be undefined");
  }
  const PATH = `/users/${userId}/create-user-bucket`;
  const RESPONSE = await (
    await fetch(`${BASE_URL}+${PATH}`, {
      headers: {
        Authorization: TOKEN,
        "X-Amz-Date": new Date().toUTCString(),
      },
      method: "GET",
    })
  ).json();
  return RESPONSE as ApiResponse;
};
