import {Store} from "./store";
import {Status} from "./status";

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
