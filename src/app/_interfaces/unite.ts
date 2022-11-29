import {Store} from "./store";

export class Unite{
  id?: number;
  internalReference?: number;
  idStore: number;
  idTypeVoucher: number;
  quantityNotebook: number;
  createdAt?: Date;
  updatedAt?: Date;
  status?: Status;
}

export class Status{
  name: string;
  description: string;
  id: number
}
