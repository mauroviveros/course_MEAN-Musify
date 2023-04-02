export interface AuthResponse {
  _id       : string;
  __v       : number;
  name      : string;
  surname   : string;
  email     : string;
  role      : string;
  password  : string;
  image     : string;
  token?    : string;
}
