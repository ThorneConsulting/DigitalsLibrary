import { ApiResponse } from "../models";

export const UNAUTHORIZED = {
  message: "You may not have authorization to access the requested resource",
  statusCode: 401,
} as ApiResponse;
export const FORBIDDEN = {
  message:
    "Access to the requested resource is denied, you may have insufficient permissions",
  statusCode: 403,
} as ApiResponse;
export const NOT_FOUND = {
  message: "Requested resource cannot be found",
  statusCode: 404,
} as ApiResponse;
export const BAD_REQUEST = {
  message: "Invalid request",
  statusCode: 400,
} as ApiResponse;
export const GENERIC_ERROR = {
  message: "Something went wrong",
  statusCode: 500,
} as ApiResponse;
export const CREATED_SUCCESS = {
  message: "Created successfully",
  statusCode: 201,
} as ApiResponse;
export const GENERIC_SUCCESS = {
  message: "Success",
  statusCode: 200,
} as ApiResponse;
