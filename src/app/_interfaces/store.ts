export class Store{
  id?: number;
  internalReference?: number;
  localization: string;
  createdAt?: Date;
  updateAt?: Date;
  status?: Status;
}

export class Status{
  name: string;
  description: string;
  id: number
}
