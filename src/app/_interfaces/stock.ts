import {Store} from "./store";

export class Stock {
  id?: number;
  internalReference?: number;
  idStore1?: number;
  idStore2?: number;
  idStoreHouseStockage1?: number;
  idStoreHouseStockage2?: number;
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

export class Status{
  name: string;
  description: string;
  id: number
}
