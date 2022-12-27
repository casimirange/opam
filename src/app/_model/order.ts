import {Client} from "./client";
import {Status} from "./status";

export class Order{
    id?:	number
    internalReference?: number
    clientReference?:	number
    idClient?:	number
    client?:	Client
    idFund?:	number
    idManagerStore?:	number
    idManagerCoupon?:	number
    idManagerOrder?:	number
    idStorekeeper?:	number
    linkInvoice?: string
    linkDelivery?: string
    tax?:	number
    idStore?: number
    status?:	Status
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
    localisation?:	string
    completeName?:	string
  }

