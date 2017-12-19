/**
 * Generic Error Response interface
 * @TODO make this more strict
 */
export interface ErrorResponse {
  message?: string;
  status?: string;
  error: {
    code: number;
    message: string;
    metadata: { _internal_repr: {} };
    name: string;
    stack: string;
    statusCode: number;
  };
  json?: Function;
}
