import {Store} from "./store";
import {Status} from "./status";

export class Station{
  id?: number;
  internalReference?: number;
  localization: string;
  designation: string;
  pinCode: number;
  balance: number;
  managerStagion: number;
  idManagerStation: number;
  createdAt?: Date;
  updateAt?: Date;
  status?: Status;
}

