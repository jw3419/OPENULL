import { Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { from } from 'rxjs';
import HttpException from '../util/exceptions/exceptions';
import { OrderAttributes } from 'src/interfaces/orders.interface';
import { VoucherAttributes } from 'src/interfaces/vouchers.interface';
import { Order } from 'src/models/orders.model';
import { User } from 'src/models/users.model';
import { UserVoucher } from 'src/models/user_voucher.model';
import { Voucher } from 'src/models/vouchers.model';
import { authHandler } from '../util/auth/auth.middleware';

@Injectable()
export class AdminsService {
  public vouchers = Voucher;
  public users = User;
  public orders = Order;
  public userVouchers = UserVoucher;

  public async createVoucher(voucherData: VoucherAttributes) {
    const createVoucherData = this.vouchers.create({ ...voucherData });
    return { message: 'Success to add voucher' };
  }

  public async updateAdminUser(req: FastifyRequest) {
    const userData = await authHandler(req);

    if (!userData)
      throw new HttpException(409, 'This is an unauthenticated user.');

    const updateUserData = await this.users.update(
      { admin: true },
      { where: { id: userData.id } },
    );

    return { message: 'Complete to promotion' };
  }

  public async updateOrderStatus(req, orderId: number, status: string) {
    const userData = await authHandler(req);

    if (!userData || !userData.admin)
      throw new HttpException(409, `You're not admin user.`);

    const findOrderData: OrderAttributes = await this.orders.findByPk(orderId);
    const findVoucherData: VoucherAttributes = await this.vouchers.findOne({
      where: { name: findOrderData.use_voucher },
    });

    if (status === '주문반려' && findOrderData.use_voucher === '5% 할인 쿠폰') {
      const paybackVoucher = await this.userVouchers.create({
        user_id: userData.id,
        voucher_id: findVoucherData.id,
      });
    }

    const updateOrderData = await this.orders.update(
      { status },
      { where: { id: orderId } },
    );

    return { message: 'Successto update order status' };
  }
}
