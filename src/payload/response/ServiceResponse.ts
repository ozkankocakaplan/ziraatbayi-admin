export default interface ServiceResponse<T> {
  hasExceptionError: boolean;
  isSuccessful: boolean;
  exceptionMessage: string;
  count: number;
  entity: T;
  list: T[];
  message: string;
}
