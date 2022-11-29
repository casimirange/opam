import {Store} from "./store";

export class Piece{
  id?: number;
  internalReference?: number;
  idStoreHouse: number;
  idStoreKeeper: number;
  serialNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: Status;
}

export class Status{
  name: string;
  description: string;
  id: number
}
