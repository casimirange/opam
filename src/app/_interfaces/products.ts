  export class Products{
    id?:	number
    internalReference?: number
    idTypeVoucher?:	number
    idOrder?:	number
    quantityNotebook?:	number
    createdAt?:	Date
    updateAt?:	Date
    status?:	Status
  }

  export class Status{
    name: string;
    description: string;
    id: number
  }
