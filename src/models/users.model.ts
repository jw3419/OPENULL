import {
  Model,
  Column,
  Default,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserAttributes } from 'src/interfaces/users.interface';
import { UserVoucher } from './user_voucher.model';
import { Voucher } from './vouchers.model';

@Table({ timestamps: true })
export class User extends Model<UserAttributes> {
  @Column
  email: string;

  @Column
  password: string;

  @Column
  name: string;

  @Default(false)
  @Column
  admin: boolean;

  @BelongsToMany(() => Voucher, () => UserVoucher)
  voucher: Voucher;
}
