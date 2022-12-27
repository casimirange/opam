import {Store} from "./store";
import {IUser} from "./user";
import {Status} from "./status";

export class  Supply{
  id?: number;
  internalReference?: number;
  idStoreKeeper?: number;
  idStoreHouseStockage?: number;
  idStoreHouseSell: number;
  idCarton: number;
  createdAt?: Date;
  updateAt?: Date;
  status?: Status;
  serialTo?: number;
  number?: number;
  serialFrom?: number;
  typeVoucher?: number;
  from?: number;
  to?: number;
}
