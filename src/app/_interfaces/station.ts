import {Store} from "./store";

export class Station{
  id?: number;
  internalReference?: number;
  localization: string;
  designation: string;
  pinCode: number;
  balance: number;
  createdAt?: Date;
  updateAt?: Date;
  status?: Status;
}

export class Status{
  name: string;
  description: string;
  id: number
}
