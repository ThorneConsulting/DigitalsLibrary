const extractTokenFromUrl = async () => {
  if (!!location.hash) {
    const TOKEN = location.hash
      .split("#")[1]
      .split("=")[1]
      .split("access_token")[0]
      .split("&")[0];
    document.cookie = `token=${TOKEN};Path=/;Expires=${new Date(
      new Date().setHours(new Date().getHours() + 1)
    ).toLocaleString()}`;
    return TOKEN;
  }
  return undefined;
};

export const getToken = async () => {
  const URL_TOKEN = await extractTokenFromUrl();
  if (!!URL_TOKEN) {
    return URL_TOKEN;
  } else {
    const COOKIE_TOKEN = document.cookie.split(";")[0].split("=")[1];
    return COOKIE_TOKEN;
  }
};
