export class TypeVoucher{
  id?: number;
  internalReference?: number;
  designation?: string;
  amount: number;
  createdAt?: Date;
  updateAt?: Date;
  status?: Status;
}

export class Status{
  name: string;
  description: string;
  id: number
}
