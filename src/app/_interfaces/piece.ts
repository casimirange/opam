import {Store} from "./store";
import {Status} from "./status";

export class Piece{
  id?: number;
  internalReference?: number;
  // idStoreHouse: number;
  // idStoreKeeper: number;
  // serialNumber: string;
  idTypeVoucher: number;
  idStoreHouse: number;
  quantityNotebook: number;
  quantityCarton: number;
  createdAt?: Date;
  updatedAt?: Date;
  status?: Status;
}
