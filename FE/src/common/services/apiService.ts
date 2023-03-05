import { ApiResponse, UserFilesModel } from "../models";
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
  return RESPONSE as ApiResponse;
};

export const createUserBucket = async (userId: string | undefined) => {
  if (userId === undefined) {
    throw new Error("UserId cannot be undefined");
  }
  const PATH = `/users/${userId}/create-user-bucket`;
  const RESPONSE = await (
    await fetch(`${BASE_URL}${PATH}`, {
      headers: {
        Authorization: TOKEN,
        "X-Amz-Date": new Date().toUTCString(),
      },
      method: "POST",
    })
  ).json();
  return RESPONSE as ApiResponse;
};

export const uploadFiles = async (
  userId: string | undefined,
  fileToUpload: any,
  fileHash: string
) => {
  if (userId === undefined) {
    throw new Error("UserId cannot be undefined");
  }
  const PATH = `/users/${userId}/file/${fileHash}`;
  let data = new FormData();
  data.append("name", "Image Upload");
  data.append("file", fileToUpload);
  const RESPONSE = await (
    await fetch(`${BASE_URL}${PATH}`, {
      headers: {
        Authorization: TOKEN,
        "X-Amz-Date": new Date().toUTCString(),
        "Content-Type": "multipart/form-data",
      },
      body: data,
      method: "POST",
    })
  ).json();
  return RESPONSE as ApiResponse;
};

export const getUserFiles = async (userId: string | undefined) => {
  const RESPONSE = await (
    await fetch(`${BASE_URL}/users/${userId}/files`, {
      headers: {
        Authorization: TOKEN,
        "X-Amz-Date": new Date().toUTCString(),
      },
      method: "GET",
    })
  ).json();
  const DATA = RESPONSE as ApiResponse;
  return DATA.data["files"] as UserFilesModel[];
};
