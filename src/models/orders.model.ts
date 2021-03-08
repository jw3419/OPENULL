import {
  Model,
  Column,
  ForeignKey,
  Table,
  Default,
  BelongsTo,
} from 'sequelize-typescript';
import { OrderAttributes } from 'src/interfaces/orders.interface';
import { User } from './users.model';

@Table({ timestamps: true })
export class Order extends Model<OrderAttributes> {
  @Column
  product_name: string;

  @Column
  product_price: number;

  @Column
  url: string;

  @Column
  address: string;

  @Column
  phone: string;

  @Default('주문접수')
  @Column
  status: string;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Column
  use_voucher: string;

  @BelongsTo(() => User, 'user_id')
  user: User;
}
