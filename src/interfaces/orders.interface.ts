import { UserAttributes } from './users.interface';

export interface OrderAttributes {
  id?: number;
  product_name: string;
  product_price: number;
  url: string;
  address: string;
  phone: string;
  status: string;
  user_id?: UserAttributes | number;
  use_voucher: string;
  createdAt?: Date;
  updatedAt?: Date;
}
