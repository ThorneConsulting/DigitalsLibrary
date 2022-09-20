import * as ROUTES from "./routes";

module.exports = {
  getUserFiles: ROUTES.getUserFiles,
  uploadUserFile: ROUTES.uploadUserFile,
  createUserBucketIfNotExist: ROUTES.createUserBucketIfNotExist,
};
