const extractTokenFromUrl = async () => {
  const TOKEN = location.hash
    .split("#")[1]
    .split("=")[1]
    .split("access_token")[0]
    .split("&")[0];
  document.cookie = `token=${TOKEN}`;
  return TOKEN;
};

export const getToken = async () => {
  let token = document.cookie.split(";")[0].split("=")[1];
  if (token !== null && token !== undefined) {
    console.log(token);
    return token;
  }
  return await extractTokenFromUrl();
};
