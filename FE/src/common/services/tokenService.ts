let TOKEN: string | null = null;

export const extractTokenFromUrl = async () => {
  if (location.hash === "" || location.hash === undefined) {
    TOKEN = document.cookie.split("=")[1];
  } else {
    TOKEN = location.hash
      .split("#")[1]
      .split("=")[1]
      .split("access_token")[0]
      .split("&")[0];
    document.cookie = `token=${TOKEN}`;
  }
};

export const getToken = async () => {
  return TOKEN;
};
