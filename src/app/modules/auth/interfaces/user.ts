export interface User {
  _id       : string;
  __v       : number;
  name      : string;
  surname   : string;
  email     : string;
  role      : string;
  password  : string;
  image     : string;
}


export interface AuthResponse{
  user    : User;
  token?  : string;
}

export interface AuthReqest{
  name      : string;
  surname   : string;
  email     : string;
  password  : string;
}
