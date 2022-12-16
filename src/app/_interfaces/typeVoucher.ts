import {Status} from "./status";

export class TypeVoucher{
  id?: number;
  internalReference?: number;
  designation?: string;
  amount: number;
  createdAt?: Date;
  updateAt?: Date;
  status?: Status;
}
