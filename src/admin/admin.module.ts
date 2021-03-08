import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from 'src/models/orders.model';
import { User } from 'src/models/users.model';
import { UserVoucher } from 'src/models/user_voucher.model';
import { Voucher } from 'src/models/vouchers.model';
import { AdminsController } from './admin.controller';
import { AdminsService } from './admin.service';

@Module({
  imports: [SequelizeModule.forFeature([UserVoucher, Voucher, User, Order])],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
