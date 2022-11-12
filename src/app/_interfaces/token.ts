export interface IToken{
  // id?: string;
  // username?: string;
  // phone?: number;
  // roles?: string[];
  // access_token?: string;

  using2FA?: boolean,
  qrCodeImage?: string,
  access_token?: string,
  authenticated?: boolean,
  roles?: string[];
  username?: string;

  // userId?: number;
  // username?: string;
  // name?: string;
  // surname?: string;
  // email?: string;
  // tel1?: string;
  // bearerToken?: string;
  // refreshToken?: string;
  // status?: Status;
  // authenticated?: true;
  // roles?: string[]
}

export interface IRefreshToken{
  userId?: number;
  username?: string;
  name?: string;
  surname?: string;
  email?: string;
  tel1?: string;
  bearerToken?: string;
  refreshToken?: string;
  status?: Status;
  authenticated?: true;
  roles?: string[]
}

export class Status{
  name: string;
  description: string;
  id: number
}
