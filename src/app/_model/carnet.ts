import {Status} from "./status";
import {Carton} from "./carton";

export class Carnet{
  id?: number;
  internalReference?: number;
  idCarton: number;
  idStoreKeeper: number;
  idStoreHouse: number;
  serialNumber: string;
  createdAt?: Date;
  updateAt?: Date;
  status?: Status;
  amountCoupon: number;
  carton: Carton;
  nameStoreHouse: string;
  nameStoreKeeper: string;
  numberCarton: number;
}

