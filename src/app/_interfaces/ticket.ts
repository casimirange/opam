import {Status} from "./status";

export class Ticket{
  id?:	number
  internalReference?: number
  idCoupon:	number
  idRequestOpposition: number
  status?:	Status
  createdAt?:	string
  updateAt?:	string
}
