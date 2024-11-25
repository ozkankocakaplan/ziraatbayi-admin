export default interface ServiceResponse<T> {
  hasExceptionError: boolean;
  isSuccessful: boolean;
  exceptionMessage: object;
  count: number;
  entity: T;
  list: T[];
  message: string;
}
