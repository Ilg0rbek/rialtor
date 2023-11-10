export interface IAuth {
  username: string;
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
