type Users = {
  id: string;
  name: string;
  username: string;
  email: string;
  driver_license: string;
  is_admin?: boolean;
  created_at: Date;
};

declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: Users;
    token: string;
  }
}
