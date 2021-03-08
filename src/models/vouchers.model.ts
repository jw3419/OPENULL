import { Model, Column, Table, BelongsToMany } from 'sequelize-typescript';
import { VoucherAttributes } from 'src/interfaces/vouchers.interface';
import { User } from './users.model';
import { UserVoucher } from './user_voucher.model';

@Table({ timestamps: true })
export class Voucher extends Model<VoucherAttributes> {
  @Column
  name: string;

  @BelongsToMany(() => User, () => UserVoucher)
  user: User;
}
