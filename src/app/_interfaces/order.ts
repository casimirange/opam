  export class Order{
    id?:	number
    internalReference?: number
    clientReference?:	number
    idClient?:	number
    idFund?:	number
    idManagerStore?:	number
    idManagerCoupon?:	number
    idManagerOrder?:	number
    idStorekeeper?:	number
    tax?:	number
    idStore?: number
    status?:	StatusOrder
    channel?:	string
    deliveryTime?:	string
    paymentReference?:	string
    reasonForCancellation?:	string
    description?:	string
    createdAt?:	string
    updateAt?:	string
    idPaymentMethod?:	number
    netAggregateAmount?:	number
    ttcaggregateAmount?:	number
  }

  export class StatusOrder{
    id: number;
    // description: string;
    name: string;
    // ORDER_CREATED = 'ORDER_CREATED',
    // ORDER_COMPLETED = 'ORDER_COMPLETED',
    // ORDER_PAYED = 'ORDER_PAYED',
    // ORDER_CANCEL = 'ORDER_CANCEL'
  }
