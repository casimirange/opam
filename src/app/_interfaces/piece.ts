import {Store} from "./store";
import {Status} from "./status";

export class Piece{
  id?: number;
  internalReference?: number;
  // idStoreHouse: number;
  // idStoreKeeper: number;
  // serialNumber: string;
  idTypeVoucher: number;
  typeVoucher: number;
  idStoreHouse: number;
  quantityNoteBook: number;
  quantityCarton: number;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
  status?: Status;
}
