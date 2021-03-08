import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from 'src/models/orders.model';
import { UserVoucher } from 'src/models/user_voucher.model';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [SequelizeModule.forFeature([Order, UserVoucher])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
