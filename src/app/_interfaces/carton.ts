import {Store} from "./store";

export class Carton{
  id?: number;
  internalReference?: number;
  idStoreHouse: number;
  idStoreKeeper: number;
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
