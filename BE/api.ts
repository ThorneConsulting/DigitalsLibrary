import * as ROUTES from "./routes";

module.exports = {
  getUserFiles: ROUTES.getUserFilesAsync,
  uploadUserFile: ROUTES.uploadUserFileAsync,
  createUserBucketIfNotExist: ROUTES.createUserBucketIfNotExistAsync,
};
