import ICategory from "./ICategory";

export default interface IProduct {
  id: number;
  name: string;
  price: string;
  mainFileUrl: any;
  childsFilesUrl: any;
  mainFileCLDId: string;
  childsFilesCLDId: string;
  code: string;
  server: string;
  loginType: string;
  operatingSystem: string;
  gemChono: number;
  descriptions: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  category: ICategory;
  quantity: any;
}
