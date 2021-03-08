import { UserAttributes } from './users.interface';
import { VoucherAttributes } from './vouchers.interface';

export interface UserVoucherAttributes {
  id?: number;
  user_id: UserAttributes | number;
  voucher_id: VoucherAttributes | number;
  createdAt?: Date;
  updatedAt?: Date;
}
