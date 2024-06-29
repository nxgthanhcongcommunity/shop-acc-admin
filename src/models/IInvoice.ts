import IAccount from "./IAccount";

export default interface IInvoice {
  id: number;
  code: string;
  totalAmount: string;
  discount: string;
  paymentStatus: string;
  paymentMethod: string;
  accountId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  account: IAccount;
}
