import { CognitoJwtVerifier } from "aws-jwt-verify";

export const VERIFY_VALID_USER_ID = async (
  authToken: string,
  userId: string
) => {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: "ap-southeast-2_YVSpAqxya",
    tokenUse: "id",
    clientId: "1geodasbkgprokukl0fmo12dei",
  });
  const payload = await verifier.verify(
    authToken // the JWT as string
  );

  return payload.sub === userId;
};
