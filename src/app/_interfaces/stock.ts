import {Store} from "./store";
import {Status} from "./status";

export class Stock {
  id?: number;
  internalReference?: number;
  idStore1?: number;
  idStore2?: number;
  idStoreHouseStockage: number;
  idStoreHouseStockage2?: number;
  listCartons: number[];
  idStoreHouse1?: number;
  idStoreHouse2?: number;
  idStoreKeeper?: number;
  quantityCarton?: number;
  typeVoucher?: number;
  type?: string;
  createdAt?: Date;
  updateAt?: Date;
  status?: Status;
}

