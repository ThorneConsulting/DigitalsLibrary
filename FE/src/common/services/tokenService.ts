const extractTokenFromUrl = async () => {
  const TOKEN = location.hash
    .split("#")[1]
    .split("=")[1]
    .split("access_token")[0]
    .split("&")[0];
  console.log(TOKEN);
  return TOKEN;
};

export const getToken = async () => {
  return await extractTokenFromUrl();
};
