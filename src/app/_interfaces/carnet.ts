import {Store} from "./store";

export class Carnet{
  id?: number;
  internalReference?: number;
  idCarton: number;
  idStoreKeeper: number;
  serialNumber: string;
  createdAt?: Date;
  updateAt?: Date;
  status?: Status;
}

export class Status{
  name: string;
  description: string;
  id: number
}
