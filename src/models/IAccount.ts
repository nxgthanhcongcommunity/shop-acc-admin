import IBalance from "./IBalance";

export default interface IAccount {
  id: number;
  code: string;
  idAtProvider: string;
  familyName: string;
  givenName: string;
  email: string;
  passwordHash: string;
  isVerifyEmail: boolean;
  photo: string;
  providerName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  balance: IBalance;
}
