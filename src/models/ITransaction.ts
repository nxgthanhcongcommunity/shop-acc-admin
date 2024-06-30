export default interface ITransaction {
  id: number;
  provider: string;
  amount: string;
  orderInfo: string;
  payDate: string;
  succeed: boolean;
  message: string;
  transactionNo: string;
  refNo: string;
  raw: string;
  accountId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
