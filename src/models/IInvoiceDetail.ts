import IInvoice from "./IInvoice";
import IProduct from "./IProduct";

export default interface IInvoiceDetail {
  id: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  invoiceId: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  invoice: IInvoice;
  product: IProduct;
}
