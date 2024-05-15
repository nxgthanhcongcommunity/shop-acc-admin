interface IObjectKeys {
  [key: string]: string | number,
}

export interface IBanner {
  id: number;
  name: string;
  code: string;
  order: number;
}

export interface ICategory extends IObjectKeys {
  id: number;
  name: string;
  code: string;
  bannerCode: string;
}

export interface IProduct extends IObjectKeys {
  name: string,
  mainFileUrl: string,
  mainFileCLDId: string,
  childsFilesUrl: string,
  childsFilesCLDId: string,
  code: string,
  server: string,
  loginType: string,
  operatingSystem: string,
  gemChono: string,
  descriptions: string,
  categoryCode: string,
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
}