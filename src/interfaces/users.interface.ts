export interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  name: string;
  admin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
