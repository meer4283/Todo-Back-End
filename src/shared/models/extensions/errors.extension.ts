// Added because the default JavaScript Error class does not have statusCode property
export interface IHTTPError extends Error {
  statusCode: number;
}

