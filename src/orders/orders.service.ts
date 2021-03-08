import { Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import HttpException from '../util/exceptions/exceptions';
import { OrderAttributes } from 'src/interfaces/orders.interface';
import { UserAttributes } from 'src/interfaces/users.interface';
import { Order } from 'src/models/orders.model';
import { User } from 'src/models/users.model';
import { UserVoucher } from 'src/models/user_voucher.model';
import { Voucher } from 'src/models/vouchers.model';
import { authHandler } from '../util/auth/auth.middleware';

@Injectable()
export class OrdersService {
  public orders = Order;
  public users = User;
  public vouchers = Voucher;
  public userVouchers = UserVoucher;

  public async findList(req: FastifyRequest): Promise<object> {
    const userData = await authHandler(req);
    if (!userData)
      throw new HttpException(409, 'This is an unauthenticated user.');

    const findOrder = await this.orders.findAll({
      where: { user_id: userData.id },
    });

    return { data: findOrder, message: 'OK' };
  }

  public async create(orderData, req: FastifyRequest): Promise<object> {
    const userData = await authHandler(req);

    if (!userData)
      throw new HttpException(409, 'This is an unauthenticated user.');

    const findVoucherData = await this.vouchers.findOne({
      where: { name: orderData.use_voucher },
    });

    const deleteUserVoucher = await this.userVouchers.destroy({
      where: { user_id: userData.id, voucher_id: findVoucherData.id },
    });

    const preOrderData: OrderAttributes = {
      ...orderData,
      user_id: userData.id,
    };

    const createOrderData = this.orders.create({
      ...preOrderData,
    });

    return { message: 'Success to order' };
  }
}
