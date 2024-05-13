interface IObjectKeys {
  [key: string]: string,
}

export interface IBanner {
  id: number;
  name: string;
  code: string;
}

export interface ICategory {
  id: number;
  name: string;
  code: string;
  bannerCode: string;
}

export interface IProduct extends IObjectKeys {

}