export interface ApiResponse {
  statusCode: number;
  body: ApiResponseBody;
}

interface ApiResponseBody {
  message: string;
  data: any;
}
