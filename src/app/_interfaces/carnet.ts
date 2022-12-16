import {Status} from "./status";

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

