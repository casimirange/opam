export class PaiementMethod{
  id?: number;
  internalReference?: number;
  designation: string;
  createdAt?: Date;
  updateAt?: Date;
  status?: Status;
}

export class Status{
  name: string;
  description: string;
  id: number
}
