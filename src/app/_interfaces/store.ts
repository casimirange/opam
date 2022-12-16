import {Status} from "./status";

export class Store{
  id?: number;
  internalReference?: number;
  localization: string;
  createdAt?: Date;
  updateAt?: Date;
  status?: Status;
}
