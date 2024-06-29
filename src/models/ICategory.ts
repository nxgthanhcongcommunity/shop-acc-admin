import IProduct from "./IProduct";

export default interface ICategory {
  id: number;
  name: string;
  code: string;
  bannerCode: string;
  mainFileUrl: any;
  mainFileCLDId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  products: IProduct[];
}
