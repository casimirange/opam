import {Clients} from "./clients";
import {Client} from "./client";

export interface CustomResponseCliennts {
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  Pageable: any
  size: number;
  sort: any;
  totalElements: number;
  totalPages: number;
  content: { clients?: Client[], client?: Client }; // ? signifie que la valeur peut être null
}
