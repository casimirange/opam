import {Status} from "./status";

export class IUser{
  id?: string;
  name?: string;
  firstname?: string;
  firstName?: string;
  username?: string;
  password?: string;
  pinCode?: number;
  internalReference?: number;
  email?: string;
  function?: string;
  phone?: number;
  roles?: string[];
  magasin?: string;
  crreatedAt?: Date;
  updatedAt?: Date;
  status?: Status;
  access_token?: string;
}
