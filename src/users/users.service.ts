import { Injectable } from '@nestjs/common';
import HttpException from '../util/exceptions/exceptions';
import { UserAttributes } from 'src/interfaces/users.interface';
import { User } from 'src/models/users.model';
import * as bcrypt from 'bcryptjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  authHandler,
  createCookie,
  createToken,
} from 'src/util/auth/auth.middleware';
import { UserVoucher } from 'src/models/user_voucher.model';
import { UserVoucherAttributes } from 'src/interfaces/user-voucher.interface';
import { VoucherAttributes } from 'src/interfaces/vouchers.interface';
import { Voucher } from 'src/models/vouchers.model';

@Injectable()
export class UsersService {
  public users = User;
  public userVouchers = UserVoucher;
  public voucher = Voucher;

  public async signUp(userData: UserAttributes): Promise<object> {
    const findUser: UserAttributes = await this.users.findOne({
      where: { email: userData.email },
    });
    if (findUser)
      throw new HttpException(
        409,
        `You're email ${userData.email} already exists`,
      );

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    const voucherData1: VoucherAttributes = await this.voucher.findOne({
      where: { name: '5% 할인 쿠폰' },
    });
    const voucherData2: VoucherAttributes = await this.voucher.findOne({
      where: { name: '5000원 할인 쿠폰' },
    });
    const createUserVoucherData1: UserVoucherAttributes = await this.userVouchers.create(
      {
        user_id: createUserData.id,
        voucher_id: voucherData1.id,
      },
    );
    const createUserVoucherData2: UserVoucherAttributes = await this.userVouchers.create(
      {
        user_id: createUserData.id,
        voucher_id: voucherData2.id,
      },
    );

    return { message: 'Success to sign up' };
  }

  public async signIn(
    userData: UserAttributes,
    res: FastifyReply,
  ): Promise<object> {
    const findUser: UserAttributes = await this.users.findOne({
      where: { email: userData.email },
    });

    if (!findUser)
      throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(
      userData.password,
      findUser.password,
    );

    if (!isPasswordMatching)
      throw new HttpException(409, "You're password not matching");

    const tokenData = createToken(userData);
    createCookie(tokenData, res);
    return { message: 'Success to sign in' };
  }

  public async signOut(req: FastifyRequest, res: FastifyReply) {
    const userData = await authHandler(req);
    if (userData) {
      res.clearCookie('accessToken', {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
      });
      return { message: 'Success to Sign out' };
    } else {
      return { message: 'Fail to sign out' };
    }
  }
}
