import {Store} from "./store";

export class StoreHouse{
  id?: number;
  internalReference?: number;
  idStore: number;
  type: string;
  name: string;
  localisationStore: string;
  createAt?: Date;
  updateAt?: Date;
  status?: Status;
}

export class Status{
  name: string;
  description: string;
  id: number
}
