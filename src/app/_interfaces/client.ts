import {ClientTypeEnum} from "../_enum/clientTypeEnum";

export class Client {
  id?: number;
  internalReference?: number;
  completeName: string;
  companyName: string;
  address: string;
  phone: string;
  email: string;
  gulfcamAccountNumber: string;
  rccm: string;
  typeClient: TypeClient;
  createdAt?: Date
  updateAt?: Date

}

export class TypeClient{
  id?: string;
  name: string
}
