import {Store} from "./store";
import {IUser} from "./user";

export class Carton{
  id?: number;
  internalReference?: number;
  idStoreHouseStockage: number;
  idStoreHouseSell?: number;
  idStoreKeeper: number;
  storeKeeper?: IUser;
  nameStoreHouse?: string;
  // serialNumber: string;
  createdAt?: Date;
  updateAt?: Date;
  status?: Status;

  serialTo: number;
  number: number;
  serialFrom: number;
  typeVoucher: number;
  from: number;
  to: number;
}

export class Status{
  name: string;
  description: string;
  id: number
}
