declare interface IBaseResponse<T> {
  data?: T;
  message?: string;
  succeed: boolean;
}

declare interface IPaging<T> {
  records: T[];
  total: number;
  pageSize?: number;
  pageNumber?: number;
}
