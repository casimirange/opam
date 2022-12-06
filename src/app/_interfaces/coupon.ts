import {Store} from "./store";

export class Coupon{
  id?: number;
  internalReference?: number;
  idClient?: number;
  idTicket?: number;
  idNotebook: number;
  idStation?: number;
  idTypeVoucher?: number;
  idRequestOpposition?: number;
  idCreditNote?: number;
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
