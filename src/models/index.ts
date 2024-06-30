interface IObjectKeys {
  [key: string]: string | number;
}

export interface IBanner {
  code: string;
  name: string;
}

export interface IAccount {
  id: number;
  email: string;
  photo: string;
  familyName: string;
  givenName: string;
  idAtProvider: string;
  isVerifyEmail: string;
  providerName: string;
  role: string;
  balance: any;
}

export type { default as ICategory } from "./ICategory";
export type { default as IProduct } from "./IProduct";
export type { default as IBalance } from "./IBalance";
export type { default as IInvoice } from "./IInvoice";
export type { default as IInvoiceDetail } from "./IInvoiceDetail";
export type { default as ISendMail } from "./ISendMail";
export type { default as ITransaction } from "./ITransaction";
