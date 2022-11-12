import {Clients} from "./clients";
import {IToken} from "./token";
import {ISignup} from "./signup";

export interface CustomResponseSignup {
  timeStamp: Date;
  statusCode: number;
  status: string;
  error: string;
  reason: string;
  message: string;
  developerMessage: string;
  data: { signups?: ISignup[], signup?: ISignup }; // ? signifie que la valeur peut être null
}
