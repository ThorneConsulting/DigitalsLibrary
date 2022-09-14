export interface DynamoRecord {
  fileName: string;
  tags: (string | undefined)[] | undefined;
  s3Url: string;
}
