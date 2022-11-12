import {Clients} from "./clients";
import {IToken} from "./token";

export interface CustomResponseLogin {
  using2FA: boolean,
  qrCodeImage: string,
  access_token: string,
  authenticated: boolean,
  data: { logins?: IToken[], login?: IToken }; // ? signifie que la valeur peut être null
}
