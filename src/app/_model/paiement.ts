import {Status} from "./status";

export class PaiementMethod{
  id?: number;
  internalReference?: number;
  designation: string;
  createdAt?: Date;
  updateAt?: Date;
  status?: Status;
}

