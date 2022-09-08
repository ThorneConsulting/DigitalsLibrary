const ROUTES = require("./routes");

const getUserFiles = ROUTES.getUserFiles;

const uploadUserFile = ROUTES.uploadUserFile;

const createUserBucketIfNotExist = ROUTES.createUserBucketIfNotExist;

module.exports = {
  getUserFiles,
  uploadUserFile,
  createUserBucketIfNotExist,
};
