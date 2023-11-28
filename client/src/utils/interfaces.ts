export interface FormData {
  avatar?: String;
  password?: String;
  username?: String;
  email?: String;
}

export interface UserState {
  loading: boolean;
  data: {
    user: any;
    status: string;
    msg: string;
  };
  error: any;
}
