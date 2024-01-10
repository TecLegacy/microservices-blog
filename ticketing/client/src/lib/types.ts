export type Method = 'get' | 'post';

export type ErrorType = {
  message: string;
  field?: string;
}[];
