import { CognitoJwtVerifier } from "aws-jwt-verify";
import { COGNITO } from "../config";

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
    authToken // the JWT as string
  );
  return payload.sub === userId;
};
