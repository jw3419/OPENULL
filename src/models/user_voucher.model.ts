import {
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { UserVoucherAttributes } from 'src/interfaces/user-voucher.interface';
import { User } from './users.model';
import { Voucher } from './vouchers.model';

@Table({ timestamps: true })
export class UserVoucher extends Model<UserVoucherAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Voucher)
  @Column
  voucher_id: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => Voucher, 'voucher_id')
  voucher: Voucher[];
}
