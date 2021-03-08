import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/users.model';
import { UserVoucher } from 'src/models/user_voucher.model';
import { Voucher } from 'src/models/vouchers.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User, UserVoucher, Voucher])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
