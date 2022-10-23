import { CognitoJwtVerifier } from "aws-jwt-verify";
import { COGNITO } from "../config";
import { UserData } from "../models/userData";

export const verifyValidUserIdAsync = async (
  authToken: string,
  userId?: string
) => {
  if (userId === undefined) {
    return false;
  }
  if (COGNITO.userPoolId === undefined || COGNITO.clientId === undefined) {
    console.log("Userpool id or Client id undefined");
    console.warn("Userpool id", COGNITO.userPoolId);
    console.warn("Client id", COGNITO.clientId);
    return false;
  }
  const verifier = CognitoJwtVerifier.create({
    userPoolId: COGNITO.userPoolId,
    tokenUse: "id",
    clientId: COGNITO.clientId,
  });
  const payload = await verifier.verify(
    authToken, // the JWT as string
    { tokenUse: "id", clientId: COGNITO.clientId }
  );
  return payload.sub === userId;
};

export const decryptJwtAsync = async (authToken: string | undefined) => {
  if (authToken == undefined) {
    return null;
  }
  console.log("AUTH", authToken);
  if (COGNITO.userPoolId === undefined || COGNITO.clientId === undefined) {
    console.log("Userpool id or Client id undefined");
    console.warn("Userpool id", COGNITO.userPoolId);
    console.warn("Client id", COGNITO.clientId);
    return null;
  }
  try {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: COGNITO.userPoolId,
      tokenUse: "id",
      clientId: COGNITO.clientId,
    });
    console.log("VERIFIER", verifier);
    const payload = await verifier.verify(
      authToken, // the JWT as string,
      { tokenUse: "id", clientId: COGNITO.clientId }
    );
    console.log("PAYLOAD", payload);
    return {
      userId: payload.sub,
      userName: payload["cognito:username"],
      email: payload.email,
    } as UserData;
  } catch (e: any) {
    console.log(e);
    return null;
  }
};
