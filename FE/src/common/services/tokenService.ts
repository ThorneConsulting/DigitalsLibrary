let TOKEN: string | null = null;

export const extractTokenFromUrl = async () => {
  TOKEN = location.hash
    .split("#")[1]
    .split("=")[1]
    .split("access_token")[0]
    .split("&")[0];
  document.cookie = `token=${TOKEN}`;
  console.log(TOKEN);
};

export const getToken = async () => {
  return TOKEN;
};
